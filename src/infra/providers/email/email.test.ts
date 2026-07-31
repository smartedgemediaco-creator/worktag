import { describe, expect, it } from "vitest";
import { MissingProviderConfigError } from "@/infra/errors";
import { getEmailProvider } from "@/infra/providers/email";

describe("getEmailProvider", () => {
  it("defaults to the console adapter in non-production", () => {
    const provider = getEmailProvider({}, "development");
    expect(provider.name).toBe("console");
  });

  it("falls back to console when NODE_ENV is test", () => {
    const provider = getEmailProvider({});
    expect(provider.name).toBe("console");
  });

  it("defaults to resend in production", () => {
    expect(() => getEmailProvider({}, "production")).toThrow(MissingProviderConfigError);
  });

  it("returns the resend adapter when a key is present", () => {
    const provider = getEmailProvider({ EMAIL_PROVIDER: "resend", RESEND_API_KEY: "re_123" });
    expect(provider.name).toBe("resend");
  });

  it("throws when resend is selected without a key", () => {
    expect(() =>
      getEmailProvider({ EMAIL_PROVIDER: "resend", RESEND_API_KEY: undefined }, "development")
    ).toThrow(MissingProviderConfigError);
  });

  it("logs through the console adapter without errors", async () => {
    const provider = getEmailProvider({ EMAIL_PROVIDER: "console" });
    await expect(
      provider.send({ to: "biz@example.com", subject: "Hello", text: "Body" })
    ).resolves.toEqual({});
  });
});
