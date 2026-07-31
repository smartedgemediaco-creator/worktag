import { timingSafeEqual } from "node:crypto";
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

const BASE_URL = "https://api.flutterwave.com/v3";

export interface FlutterwaveConfig {
  secretKey: string;
  verificationHash?: string;
}

export function flutterwaveProvider(config: FlutterwaveConfig): PaymentProvider {
  const authorize = {
    Authorization: `Bearer ${config.secretKey}`,
    "Content-Type": "application/json",
  };

  return {
    name: "flutterwave",

    async createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession> {
      const txRef = input.reference ?? createReference();
      const body = await requestJson("flutterwave", "create payment", `${BASE_URL}/payments`, {
        method: "POST",
        headers: authorize,
        body: JSON.stringify({
          tx_ref: txRef,
          amount: input.amount.amount,
          currency: input.amount.currency,
          redirect_url: input.callbackUrl,
          customer: { email: input.email },
          meta: input.metadata,
        }),
      });

      const data = body.data as { link?: string; id?: number | string } | undefined;

      if (!data?.link) {
        throw new ProviderRequestError("flutterwave", "create payment", 200, JSON.stringify(body));
      }

      return { id: String(data.id ?? txRef), reference: txRef, url: data.link };
    },

    async verifyPayment(reference: string): Promise<PaymentVerification> {
      const query = new URLSearchParams({ tx_ref: reference }).toString();
      const body = await requestJson(
        "flutterwave",
        "verify",
        `${BASE_URL}/transactions/verify_by_reference?${query}`,
        { headers: authorize }
      );

      const data = (body.data ?? {}) as {
        status?: string;
        amount?: number;
        currency?: string;
        created_at?: string;
        tx_ref?: string;
      };

      const status =
        data.status === "successful"
          ? "success"
          : data.status === "failed" || data.status === "cancelled"
            ? "failed"
            : data.status
              ? "pending"
              : "unknown";

      return {
        reference: data.tx_ref ?? reference,
        status,
        paidAmount:
          typeof data.amount === "number"
            ? {
                amount: data.amount,
                currency: (data.currency as "NGN" | "USD" | "GHS" | "KES" | "ZAR") ?? "NGN",
              }
            : undefined,
        paidAt: data.created_at,
        raw: body,
      };
    },

    verifyWebhookSignature(_rawBody: string | Buffer, headers: WebhookHeaders): boolean {
      const received = toHeaderValue(headers["verif-hash"]);
      const expected = config.verificationHash;
      if (!received || !expected) return false;

      const a = Buffer.from(received);
      const b = Buffer.from(expected);
      return a.length === b.length && timingSafeEqual(a, b);
    },

    parseWebhookEvent(rawBody: string | Buffer): PaymentWebhookEvent {
      const body = JSON.parse(rawBody.toString()) as {
        event?: string;
        data?: { tx_ref?: string; customer?: { email?: string } };
      };

      const event = body.event ?? "";
      return {
        provider: "flutterwave",
        type: mapEventType(event),
        reference: body.data?.tx_ref,
        customerEmail: body.data?.customer?.email,
        raw: body,
      };
    },
  };
}

function mapEventType(event: string): PaymentWebhookEvent["type"] {
  switch (event) {
    case "charge.completed":
    case "charge.success":
      return "payment.success";
    case "charge.failed":
      return "payment.failed";
    default:
      return "unknown";
  }
}

function toHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
