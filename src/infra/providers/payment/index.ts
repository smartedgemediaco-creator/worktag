import { env, type Env } from "@/lib/env";
import {
  MissingProviderConfigError,
  UnknownProviderError,
} from "@/infra/errors";
import { isProdLike } from "@/infra/runtime";
import { flutterwaveProvider } from "./flutterwave";
import { paystackProvider } from "./paystack";
import type { PaymentProvider } from "./types";

export type PaymentEnv = Partial<
  Pick<Env, "PAYMENT_PROVIDER" | "PAYSTACK_SECRET_KEY" | "FLUTTERWAVE_SECRET_KEY">
>;

export function getPaymentProvider(
  envOverride: PaymentEnv = env,
  nodeEnv: string = process.env.NODE_ENV ?? "development"
): PaymentProvider {
  if (!envOverride.PAYMENT_PROVIDER && isProdLike(nodeEnv)) {
    throw new MissingProviderConfigError("payment", "PAYMENT_PROVIDER");
  }
  const provider = envOverride.PAYMENT_PROVIDER ?? "paystack";

  switch (provider) {
    case "paystack":
      if (!envOverride.PAYSTACK_SECRET_KEY) {
        throw new MissingProviderConfigError("paystack", "PAYSTACK_SECRET_KEY");
      }
      return paystackProvider({ secretKey: envOverride.PAYSTACK_SECRET_KEY });

    case "flutterwave":
      if (!envOverride.FLUTTERWAVE_SECRET_KEY) {
        throw new MissingProviderConfigError(
          "flutterwave",
          "FLUTTERWAVE_SECRET_KEY"
        );
      }
      return flutterwaveProvider({
        secretKey: envOverride.FLUTTERWAVE_SECRET_KEY,
        verificationHash: envOverride.FLUTTERWAVE_SECRET_KEY,
      });

    default:
      throw new UnknownProviderError("payment", provider);
  }
}

export type { PaymentProvider } from "./types";
export type {
  CheckoutSession,
  CheckoutSessionInput,
  Money,
  PaymentCurrency,
  PaymentStatus,
  PaymentVerification,
  PaymentWebhookEvent,
  PaymentWebhookEventType,
  WebhookHeaders,
} from "./types";
