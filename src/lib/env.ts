import { z } from "zod";
import { resolveAppEnv } from "@/infra/runtime";

const rawAppEnv =
  process.env.APP_ENV ??
  (process.env.VERCEL_ENV === "preview"
    ? "staging"
    : process.env.VERCEL_ENV) ??
  process.env.NODE_ENV ??
  "development";

export const envSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]).default(resolveAppEnv(rawAppEnv)),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PAYMENT_PROVIDER: z.enum(["paystack", "flutterwave"]).optional(),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_PUBLIC_KEY: z.string().optional(),
  FLUTTERWAVE_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_PUBLIC_KEY: z.string().optional(),

  EMAIL_PROVIDER: z.enum(["resend", "console"]).optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),

  SMS_PROVIDER: z.enum(["termii", "twilio", "console"]).optional(),
  TERMII_API_KEY: z.string().optional(),
  TERMII_SENDER_ID: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),

  STORAGE_PROVIDER: z.enum(["s3", "local"]).optional(),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_ACCESS_KEY_ID: z.string().optional(),
  STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
  STORAGE_BUCKET_NAME: z.string().optional(),
  STORAGE_PUBLIC_URL: z.string().optional(),
  STORAGE_REGION: z.string().default("auto"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();
