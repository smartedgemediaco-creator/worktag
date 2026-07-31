import { env, type Env } from "@/lib/env";
import {
  MissingProviderConfigError,
  UnknownProviderError,
} from "@/infra/errors";
import { consoleSmsProvider } from "./console";
import { termiiSmsProvider } from "./termii";
import { twilioSmsProvider } from "./twilio";
import type { SmsProvider } from "./types";

export type SmsEnv = Partial<
  Pick<
    Env,
    | "SMS_PROVIDER"
    | "TERMII_API_KEY"
    | "TERMII_SENDER_ID"
    | "TWILIO_ACCOUNT_SID"
    | "TWILIO_AUTH_TOKEN"
    | "TWILIO_FROM_NUMBER"
  >
>;

export function getSmsProvider(
  envOverride: SmsEnv = env,
  nodeEnv: string = process.env.NODE_ENV ?? "development"
): SmsProvider {
  const provider = envOverride.SMS_PROVIDER ?? (nodeEnv === "production" ? "termii" : "console");

  switch (provider) {
    case "console":
      return consoleSmsProvider();

    case "termii":
      if (!envOverride.TERMII_API_KEY) {
        throw new MissingProviderConfigError("termii", "TERMII_API_KEY");
      }
      return termiiSmsProvider({
        apiKey: envOverride.TERMII_API_KEY,
        senderId: envOverride.TERMII_SENDER_ID ?? "WorkTag",
      });

    case "twilio":
      if (!envOverride.TWILIO_ACCOUNT_SID || !envOverride.TWILIO_AUTH_TOKEN) {
        throw new MissingProviderConfigError(
          "twilio",
          !envOverride.TWILIO_ACCOUNT_SID ? "TWILIO_ACCOUNT_SID" : "TWILIO_AUTH_TOKEN"
        );
      }
      if (!envOverride.TWILIO_FROM_NUMBER) {
        throw new MissingProviderConfigError("twilio", "TWILIO_FROM_NUMBER");
      }
      return twilioSmsProvider({
        accountSid: envOverride.TWILIO_ACCOUNT_SID,
        authToken: envOverride.TWILIO_AUTH_TOKEN,
        fromNumber: envOverride.TWILIO_FROM_NUMBER,
      });

    default:
      throw new UnknownProviderError("sms", provider);
  }
}

export type { SmsProvider } from "./types";
export type { SendSmsInput, SendSmsResult } from "./types";
