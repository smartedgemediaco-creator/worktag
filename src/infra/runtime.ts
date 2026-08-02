export type AppEnv = "development" | "staging" | "production";

export function isProdLike(nodeEnv: string | undefined): boolean {
  return nodeEnv === "production" || nodeEnv === "staging";
}

export function resolveAppEnv(raw?: string | undefined): AppEnv {
  const normalized = raw ?? "development";
  if (normalized === "staging" || normalized === "production") return normalized;
  return "development";
}
