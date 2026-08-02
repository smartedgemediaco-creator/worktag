import { ProviderRequestError } from "@/infra/errors";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "./types";

const BASE_URL = "https://api.resend.com";

export interface ResendEmailConfig {
  apiKey: string;
  from?: string;
}

export function resendEmailProvider(config: ResendEmailConfig): EmailProvider {
  return {
    name: "resend",
    async send(input: SendEmailInput): Promise<SendEmailResult> {
      const response = await fetch(`${BASE_URL}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: input.from ?? config.from ?? "WorkTag <no-reply@worktag.app>",
          to: input.to,
          subject: input.subject,
          reply_to: input.replyTo,
          ...(input.html ? { html: input.html } : {}),
          ...(input.text ? { text: input.text } : {}),
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => undefined);
        throw new ProviderRequestError("resend", "send", response.status, detail);
      }

      const body = (await response.json()) as { id?: string };
      return { id: body.id };
    },
  };
}
