import type { EmailProvider, SendEmailInput, SendEmailResult } from "./types";

export function consoleEmailProvider(): EmailProvider {
  return {
    name: "console",
    async send(input: SendEmailInput): Promise<SendEmailResult> {
      const recipients = Array.isArray(input.to) ? input.to.join(", ") : input.to;
      console.info(
        `[email:console] To=${recipients} Subject="${input.subject}"` +
          (input.from ? ` From=${input.from}` : "") +
          (input.html ? ` HtmlBytes=${Buffer.byteLength(input.html)}` : "") +
          (input.text ? ` TextBytes=${Buffer.byteLength(input.text)}` : "")
      );
      return {};
    },
  };
}
