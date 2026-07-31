import type { SendSmsInput, SendSmsResult, SmsProvider } from "./types";

export function consoleSmsProvider(): SmsProvider {
  return {
    name: "console",
    async send(input: SendSmsInput): Promise<SendSmsResult> {
      console.info(
        `[sms:console] To=${input.to} From=${input.senderId ?? "default"} Bytes=${Buffer.byteLength(input.message)}`
      );
      return {};
    },
  };
}
