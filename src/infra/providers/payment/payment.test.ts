import { createHmac } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import {
  MissingProviderConfigError,
  UnknownProviderError,
} from "@/infra/errors";
import { getPaymentProvider } from "@/infra/providers/payment";

const PAYSTACK_SECRET = "sk_test_paystack_secret";
const FLUTTERWAVE_SECRET = "FLWSECK_test_flutterwave_secret";

function paystackEnv() {
  return { PAYMENT_PROVIDER: "paystack" as const, PAYSTACK_SECRET_KEY: PAYSTACK_SECRET };
}

describe("getPaymentProvider", () => {
  it("defaults to paystack when PAYMENT_PROVIDER is unset", () => {
    const provider = getPaymentProvider({ PAYSTACK_SECRET_KEY: PAYSTACK_SECRET });
    expect(provider.name).toBe("paystack");
  });

  it("throws when paystack is selected without a secret key", () => {
    expect(() => getPaymentProvider({ PAYMENT_PROVIDER: "paystack" })).toThrow(
      MissingProviderConfigError
    );
  });

  it("throws when flutterwave is selected without a secret key", () => {
    expect(() => getPaymentProvider({ PAYMENT_PROVIDER: "flutterwave" })).toThrow(
      MissingProviderConfigError
    );
  });

  it("returns the flutterwave adapter when selected", () => {
    const provider = getPaymentProvider({
      PAYMENT_PROVIDER: "flutterwave",
      FLUTTERWAVE_SECRET_KEY: FLUTTERWAVE_SECRET,
    });
    expect(provider.name).toBe("flutterwave");
  });

  it("throws for an unknown provider", () => {
    expect(() =>
      getPaymentProvider({ PAYMENT_PROVIDER: "stripe" as never })
    ).toThrow(UnknownProviderError);
  });
});

describe("paystack adapter", () => {
  it("verifies webhook signatures using HMAC-SHA512", () => {
    const provider = getPaymentProvider(paystackEnv());
    const payload = JSON.stringify({ event: "charge.success", data: {} });

    const expected = createHmac("sha512", PAYSTACK_SECRET).update(payload).digest("hex");

    expect(
      provider.verifyWebhookSignature(payload, { "x-paystack-signature": expected })
    ).toBe(true);

    expect(
      provider.verifyWebhookSignature(payload, { "x-paystack-signature": "invalid" })
    ).toBe(false);

    expect(provider.verifyWebhookSignature(payload, {})).toBe(false);
  });

  it("initializes a checkout session with amount in minor units", async () => {
    const provider = getPaymentProvider(paystackEnv());
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: true,
          data: {
            authorization_url: "https://checkout.paystack.com/abc",
            access_code: "access_123",
            reference: "wt_xyz",
          },
        }),
        { status: 200 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    const session = await provider.createCheckoutSession({
      amount: { amount: 2500, currency: "NGN" },
      email: "biz@example.com",
      reference: "wt_xyz",
    });

    expect(session.url).toBe("https://checkout.paystack.com/abc");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.paystack.co/transaction/initialize",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        }),
        body: expect.stringContaining('"amount":250000'),
      })
    );
  });

  it("maps verify responses to a canonical status", async () => {
    const provider = getPaymentProvider(paystackEnv());
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            status: true,
            data: { status: "success", amount: 250000, currency: "NGN" },
          }),
          { status: 200 }
        )
      )
    );

    const verification = await provider.verifyPayment("wt_xyz");
    expect(verification.status).toBe("success");
    expect(verification.paidAmount).toEqual({ amount: 2500, currency: "NGN" });
  });

  it("parses charge.success webhooks into payment.success events", () => {
    const provider = getPaymentProvider(paystackEnv());
    const event = provider.parseWebhookEvent(
      JSON.stringify({
        event: "charge.success",
        data: { reference: "wt_xyz", customer: { email: "biz@example.com" } },
      })
    );

    expect(event.type).toBe("payment.success");
    expect(event.reference).toBe("wt_xyz");
    expect(event.customerEmail).toBe("biz@example.com");
  });
});

describe("flutterwave adapter", () => {
  it("verifies webhook signatures against the verif-hash header", () => {
    const provider = getPaymentProvider({
      PAYMENT_PROVIDER: "flutterwave",
      FLUTTERWAVE_SECRET_KEY: FLUTTERWAVE_SECRET,
    });

    expect(
      provider.verifyWebhookSignature("{}", { "verif-hash": FLUTTERWAVE_SECRET })
    ).toBe(true);
    expect(
      provider.verifyWebhookSignature("{}", { "verif-hash": "wrong" })
    ).toBe(false);
    expect(provider.verifyWebhookSignature("{}", {})).toBe(false);
  });

  it("parses charge.completed webhooks into payment.success events", () => {
    const provider = getPaymentProvider({
      PAYMENT_PROVIDER: "flutterwave",
      FLUTTERWAVE_SECRET_KEY: FLUTTERWAVE_SECRET,
    });

    const event = provider.parseWebhookEvent(
      JSON.stringify({ event: "charge.completed", data: { tx_ref: "wt_abc" } })
    );

    expect(event.type).toBe("payment.success");
    expect(event.reference).toBe("wt_abc");
  });
});
