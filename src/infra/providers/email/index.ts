import { env, type Env } from "@/lib/env";
import {
  MissingProviderConfigError,
  UnknownProviderError,
} from "@/infra/errors";
import { isProdLike } from "@/infra/runtime";
import { consoleEmailProvider } from "./console";
import { resendEmailProvider } from "./resend";
import type { EmailProvider } from "./types";

export type EmailEnv = Partial<Pick<Env, "EMAIL_PROVIDER" | "RESEND_API_KEY" | "RESEND_FROM">>;

export function getEmailProvider(
  envOverride: EmailEnv = env,
  nodeEnv: string = process.env.NODE_ENV ?? "development"
): EmailProvider {
  if (!envOverride.EMAIL_PROVIDER && isProdLike(nodeEnv)) {
    throw new MissingProviderConfigError("email", "EMAIL_PROVIDER");
  }
  const provider = envOverride.EMAIL_PROVIDER ?? "console";

  switch (provider) {
    case "console":
      return consoleEmailProvider();

    case "resend":
      if (!envOverride.RESEND_API_KEY) {
        throw new MissingProviderConfigError("resend", "RESEND_API_KEY");
      }
      return resendEmailProvider({
        apiKey: envOverride.RESEND_API_KEY,
        from: envOverride.RESEND_FROM,
      });

    default:
      throw new UnknownProviderError("email", provider);
  }
}

export type { EmailProvider } from "./types";
export type { SendEmailInput, SendEmailResult } from "./types";
