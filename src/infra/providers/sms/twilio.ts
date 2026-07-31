import { ProviderRequestError } from "@/infra/errors";
import type { SendSmsInput, SendSmsResult, SmsProvider } from "./types";

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export function twilioSmsProvider(config: TwilioConfig): SmsProvider {
  const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`).toString(
    "base64"
  );

  return {
    name: "twilio",
    async send(input: SendSmsInput): Promise<SendSmsResult> {
      const body = new URLSearchParams({
        To: input.to,
        From: input.senderId ?? config.fromNumber,
        Body: input.message,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      if (!response.ok) {
        const detail = await response.text().catch(() => undefined);
        throw new ProviderRequestError("twilio", "send", response.status, detail);
      }

      const result = (await response.json()) as { sid?: string };
      return { id: result.sid };
    },
  };
}
