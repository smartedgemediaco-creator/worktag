import { ProviderRequestError } from "@/infra/errors";
import type { SendSmsInput, SendSmsResult, SmsProvider } from "./types";

const BASE_URL = "https://api.ng.termii.com";

export interface TermiiConfig {
  apiKey: string;
  senderId: string;
}

export function termiiSmsProvider(config: TermiiConfig): SmsProvider {
  return {
    name: "termii",
    async send(input: SendSmsInput): Promise<SendSmsResult> {
      const response = await fetch(`${BASE_URL}/api/sms/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: input.to,
          from: input.senderId ?? config.senderId,
          sms: input.message,
          type: "plain",
          channel: "generic",
          api_key: config.apiKey,
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => undefined);
        throw new ProviderRequestError("termii", "send", response.status, detail);
      }

      const body = (await response.json()) as { message_id?: string };
      return { id: body.message_id };
    },
  };
}
