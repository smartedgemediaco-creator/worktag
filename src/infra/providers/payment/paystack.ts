import { createHmac, timingSafeEqual } from "node:crypto";
import { ProviderRequestError } from "@/infra/errors";
import { createReference, requestJson } from "./shared";
import type {
  CheckoutSession,
  CheckoutSessionInput,
  PaymentProvider,
  PaymentVerification,
  PaymentWebhookEvent,
  WebhookHeaders,
} from "./types";

const BASE_URL = "https://api.paystack.co";

export interface PaystackConfig {
  secretKey: string;
}

export function paystackProvider(config: PaystackConfig): PaymentProvider {
  const authorize = {
    Authorization: `Bearer ${config.secretKey}`,
    "Content-Type": "application/json",
  };

  return {
    name: "paystack",

    async createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession> {
      const reference = input.reference ?? createReference();
      const body = await requestJson(
        "paystack",
        "initialize",
        `${BASE_URL}/transaction/initialize`,
        {
          method: "POST",
          headers: authorize,
          body: JSON.stringify({
            email: input.email,
            amount: Math.round(input.amount.amount * 100),
            currency: input.amount.currency,
            reference,
            metadata: input.metadata,
            channels: input.channels,
            callback_url: input.callbackUrl,
          }),
        }
      );

      const data = body.data as
        | { authorization_url?: string; access_code?: string; reference?: string }
        | undefined;

      if (!data?.authorization_url) {
        throw new ProviderRequestError("paystack", "initialize", 200, JSON.stringify(body));
      }

      return {
        id: data.access_code ?? reference,
        reference: data.reference ?? reference,
        url: data.authorization_url,
        accessCode: data.access_code,
      };
    },

    async verifyPayment(reference: string): Promise<PaymentVerification> {
      const body = await requestJson(
        "paystack",
        "verify",
        `${BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
        { headers: authorize }
      );

      const data = (body.data ?? {}) as {
        status?: string;
        amount?: number;
        currency?: string;
        paid_at?: string;
        reference?: string;
      };

      const status =
        data.status === "success"
          ? "success"
          : data.status === "abandoned" || data.status === "failed"
            ? "failed"
            : data.status
              ? "pending"
              : "unknown";

      return {
        reference: data.reference ?? reference,
        status,
        paidAmount:
          typeof data.amount === "number"
            ? {
                amount: data.amount / 100,
                currency: (data.currency as "NGN" | "USD" | "GHS" | "KES" | "ZAR") ?? "NGN",
              }
            : undefined,
        paidAt: data.paid_at,
        raw: body,
      };
    },

    verifyWebhookSignature(rawBody: string | Buffer, headers: WebhookHeaders): boolean {
      const signature = toHeaderValue(headers["x-paystack-signature"]);
      if (!signature) return false;

      const expected = createHmac("sha512", config.secretKey)
        .update(rawBody)
        .digest("hex");

      const a = Buffer.from(expected, "hex");
      const b = Buffer.from(signature, "hex");
      return a.length === b.length && timingSafeEqual(a, b);
    },

    parseWebhookEvent(rawBody: string | Buffer): PaymentWebhookEvent {
      const body = JSON.parse(rawBody.toString()) as {
        event?: string;
        data?: { reference?: string; customer?: { email?: string } };
      };

      const event = body.event ?? "";
      const reference = body.data?.reference;
      const customerEmail = body.data?.customer?.email;

      return {
        provider: "paystack",
        type: mapEventType(event),
        reference,
        customerEmail,
        raw: body,
      };
    },
  };
}

function mapEventType(event: string): PaymentWebhookEvent["type"] {
  switch (event) {
    case "charge.success":
      return "payment.success";
    case "charge.failed":
      return "payment.failed";
    case "subscription.create":
      return "subscription.created";
    case "subscription.disable":
    case "subscription.destroy":
      return "subscription.cancelled";
    default:
      return "unknown";
  }
}

function toHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
