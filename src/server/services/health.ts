import type { EmailProvider } from "@/infra/providers/email";
import type { PaymentProvider } from "@/infra/providers/payment";
import type { SmsProvider } from "@/infra/providers/sms";
import type { StorageProvider } from "@/infra/providers/storage";
import { getEmailProvider, getPaymentProvider, getSmsProvider, getStorageProvider } from "@/infra";

export interface ProviderStatus {
  name: string;
  configured: boolean;
}

type ProviderDomain = "payment" | "email" | "sms" | "storage";

type ProviderResolver = () =>
  | PaymentProvider
  | EmailProvider
  | SmsProvider
  | StorageProvider;

const PROVIDER_RESOLVERS: Record<ProviderDomain, ProviderResolver> = {
  payment: getPaymentProvider,
  email: getEmailProvider,
  sms: getSmsProvider,
  storage: getStorageProvider,
};

export function providerStatus(): Record<ProviderDomain, ProviderStatus> {
  const result = {} as Record<ProviderDomain, ProviderStatus>;

  for (const [domain, resolve] of Object.entries(PROVIDER_RESOLVERS) as [
    ProviderDomain,
    ProviderResolver,
  ][]) {
    try {
      result[domain] = { name: resolve().name, configured: true };
    } catch {
      result[domain] = { name: domain, configured: false };
    }
  }

  return result;
}
