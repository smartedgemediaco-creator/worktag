export type PaymentCurrency = "NGN" | "USD" | "GHS" | "KES" | "ZAR";

export interface Money {
  amount: number;
  currency: PaymentCurrency;
}

export interface CheckoutSessionInput {
  amount: Money;
  email: string;
  reference?: string;
  metadata?: Record<string, unknown>;
  callbackUrl?: string;
  channels?: string[];
}

export interface CheckoutSession {
  id: string;
  reference: string;
  url: string;
  accessCode?: string;
}

export type PaymentStatus = "pending" | "success" | "failed" | "unknown";

export interface PaymentVerification {
  reference: string;
  status: PaymentStatus;
  paidAmount?: Money;
  paidAt?: string;
  raw: unknown;
}

export type PaymentWebhookEventType =
  | "payment.success"
  | "payment.failed"
  | "subscription.created"
  | "subscription.cancelled"
  | "unknown";

export interface PaymentWebhookEvent {
  provider: string;
  type: PaymentWebhookEventType;
  reference?: string;
  customerEmail?: string;
  raw: unknown;
}

export type WebhookHeaders = Record<string, string | string[] | undefined>;

export interface PaymentProvider {
  readonly name: string;
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession>;
  verifyPayment(reference: string): Promise<PaymentVerification>;
  verifyWebhookSignature(
    rawBody: string | Buffer,
    headers: WebhookHeaders
  ): boolean;
  parseWebhookEvent(rawBody: string | Buffer): PaymentWebhookEvent;
}
