import { describe, expect, it, vi } from "vitest";
import { MissingProviderConfigError, ProviderRequestError } from "@/infra/errors";
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

describe("resend adapter", () => {
  it("posts to the resend api with bearer auth and the right payload", async () => {
    const { resendEmailProvider } = await import("./resend");
    const provider = resendEmailProvider({ apiKey: "re_123", from: "WorkTag <no-reply@worktag.app>" });

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_abc" }), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await provider.send({
      to: "biz@example.com",
      subject: "Hello",
      text: "Body",
      replyTo: "team@worktag.app",
    });

    expect(result.id).toBe("email_abc");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_123",
        }),
      })
    );
    expect(fetchMock.mock.calls[0][1].body).toContain('"to":"biz@example.com"');
    expect(fetchMock.mock.calls[0][1].body).toContain('"reply_to":"team@worktag.app"');
  });

  it("throws a ProviderRequestError when resend returns an error status", async () => {
    const { resendEmailProvider } = await import("./resend");
    const provider = resendEmailProvider({ apiKey: "re_123" });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("rate limited", { status: 429 }))
    );

    await expect(
      provider.send({ to: "biz@example.com", subject: "Hi", text: "Body" })
    ).rejects.toThrow(ProviderRequestError);
  });
});
