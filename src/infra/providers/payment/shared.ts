import { randomUUID } from "node:crypto";
import { ProviderRequestError } from "@/infra/errors";

export function createReference(): string {
  return `wt_${randomUUID().replace(/-/g, "")}`;
}

export async function requestJson(
  provider: string,
  operation: string,
  url: string,
  init: RequestInit = {}
): Promise<Record<string, unknown>> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new ProviderRequestError(provider, operation, 0, "network error");
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => undefined);
    throw new ProviderRequestError(provider, operation, response.status, detail);
  }

  return (await response.json()) as Record<string, unknown>;
}
