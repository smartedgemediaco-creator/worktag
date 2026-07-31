export class ProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProviderError";
  }
}

export class MissingProviderConfigError extends ProviderError {
  constructor(provider: string, envKey: string) {
    super(
      `Provider "${provider}" requires the "${envKey}" environment variable. ` +
        `Set it or switch providers via the *PROVIDER env var (see .env.example).`
    );
    this.name = "MissingProviderConfigError";
  }
}

export class UnknownProviderError extends ProviderError {
  constructor(domain: string, provider: string) {
    super(`Unknown ${domain} provider "${provider}". Check your *PROVIDER env var.`);
    this.name = "UnknownProviderError";
  }
}

export class ProviderRequestError extends ProviderError {
  constructor(
    provider: string,
    operation: string,
    status: number,
    detail?: string
  ) {
    super(
      `${provider} ${operation} failed with status ${status}${detail ? `: ${detail}` : ""}`
    );
    this.name = "ProviderRequestError";
  }
}
