#!/usr/bin/env node
/**
 * Verifies that a given environment file contains everything the app needs to
 * boot in that environment. Staging and production REQUIRE every provider to be
 * explicitly declared — the app fails fast otherwise, so fail here first.
 *
 * Usage:
 *   node scripts/check-env.mjs .env.staging
 *   node scripts/check-env.mjs .env.production
 */
import fs from "node:fs";

const file = process.argv[2] ?? ".env.production";

if (!fs.existsSync(file)) {
  console.error(`[check-env] ✗ ${file} not found`);
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const vars = {};
for (const line of raw.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim();
  if (value && !value.startsWith("#")) vars[key] = value;
}

const APP_ENV = vars.APP_ENV ?? "development";
if (!["development", "staging", "production"].includes(APP_ENV)) {
  console.error(`[check-env] ✗ APP_ENV must be development|staging|production, got "${APP_ENV}"`);
  process.exit(1);
}

const missing = (keys) => keys.filter((key) => !vars[key]);

const errors = [];

const baseRequired = ["DATABASE_URL", "BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL"];
errors.push(...missing(baseRequired).map((key) => `missing ${key}`));

if (APP_ENV !== "development") {
  for (const [providerVar, keys] of [
    ["PAYMENT_PROVIDER", { paystack: ["PAYSTACK_SECRET_KEY"], flutterwave: ["FLUTTERWAVE_SECRET_KEY"] }],
    ["EMAIL_PROVIDER", { resend: ["RESEND_API_KEY"] }],
    ["SMS_PROVIDER", { termii: ["TERMII_API_KEY"], twilio: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM_NUMBER"] }],
    ["STORAGE_PROVIDER", { s3: ["STORAGE_ENDPOINT", "STORAGE_ACCESS_KEY_ID", "STORAGE_SECRET_ACCESS_KEY", "STORAGE_BUCKET_NAME"] }],
  ]) {
    const provider = vars[providerVar];
    if (!provider) {
      errors.push(`missing ${providerVar} — required in ${APP_ENV}`);
      continue;
    }
    if (provider === "console" || provider === "local") {
      errors.push(`${providerVar}=${provider} is not allowed in ${APP_ENV}`);
      continue;
    }
    const requiredForProvider = keys[provider];
    if (requiredForProvider) {
      errors.push(...missing(requiredForProvider).map((key) => `${providerVar}=${provider} requires ${key}`));
    } else {
      errors.push(`unknown ${providerVar} value "${provider}"`);
    }
  }
}

if (errors.length > 0) {
  console.error(`[check-env] ✗ ${file} (${APP_ENV}) failed:`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`[check-env] ✓ ${file} (${APP_ENV}) is ready for deployment`);
