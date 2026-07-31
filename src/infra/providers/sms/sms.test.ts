import { describe, expect, it, vi } from "vitest";
import { MissingProviderConfigError } from "@/infra/errors";
import { getSmsProvider } from "@/infra/providers/sms";

describe("getSmsProvider", () => {
  it("defaults to the console adapter in non-production", () => {
    const provider = getSmsProvider({}, "development");
    expect(provider.name).toBe("console");
  });

  it("defaults to termii in production", () => {
    expect(() => getSmsProvider({}, "production")).toThrow(MissingProviderConfigError);
  });

  it("throws when termii is selected without an api key", () => {
    expect(() =>
      getSmsProvider({ SMS_PROVIDER: "termii", TERMII_API_KEY: undefined }, "development")
    ).toThrow(MissingProviderConfigError);
  });

  it("throws when twilio is selected without a from number", () => {
    expect(() =>
      getSmsProvider(
        {
          SMS_PROVIDER: "twilio",
          TWILIO_ACCOUNT_SID: "AC123",
          TWILIO_AUTH_TOKEN: "tok",
        },
        "development"
      )
    ).toThrow(MissingProviderConfigError);
  });

  it("returns the twilio adapter when fully configured", () => {
    const provider = getSmsProvider(
      {
        SMS_PROVIDER: "twilio",
        TWILIO_ACCOUNT_SID: "AC123",
        TWILIO_AUTH_TOKEN: "tok",
        TWILIO_FROM_NUMBER: "+15551234567",
      },
      "development"
    );
    expect(provider.name).toBe("twilio");
  });

  it("posts to the termii api with the right payload", async () => {
    const provider = getSmsProvider(
      {
        SMS_PROVIDER: "termii",
        TERMII_API_KEY: "termii_key",
        TERMII_SENDER_ID: "WorkTag",
      },
      "development"
    );

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message_id: "m_123" }), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await provider.send({ to: "+2348012345678", message: "Your OTP is 1234" });

    expect(result.id).toBe("m_123");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.ng.termii.com/api/sms/send",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"from":"WorkTag"'),
      })
    );
    expect(fetchMock.mock.calls[0][1].body).toContain('"to":"+2348012345678"');
    expect(fetchMock.mock.calls[0][1].body).toContain("Your OTP is 1234");
  });
});
