import { Resend, type CreateEmailOptions } from "resend";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "./types";

export interface ResendEmailConfig {
  apiKey: string;
  from?: string;
}

export function resendEmailProvider(config: ResendEmailConfig): EmailProvider {
  const client = new Resend(config.apiKey);

  return {
    name: "resend",
    async send(input: SendEmailInput): Promise<SendEmailResult> {
      const options = {
        from: input.from ?? config.from ?? "WorkTag <no-reply@worktag.app>",
        to: input.to,
        subject: input.subject,
        replyTo: input.replyTo,
        ...(input.html ? { html: input.html } : {}),
        ...(input.text ? { text: input.text } : {}),
      } as unknown as CreateEmailOptions;
      const { data } = await client.emails.send(options);
      return { id: data?.id };
    },
  };
}
