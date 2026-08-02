import { env, type Env } from "@/lib/env";
import {
  MissingProviderConfigError,
  UnknownProviderError,
} from "@/infra/errors";
import { isProdLike } from "@/infra/runtime";
import { localStorageProvider } from "./local";
import { s3StorageProvider } from "./s3";
import type { StorageProvider } from "./types";

export type StorageEnv = Partial<
  Pick<
    Env,
    | "STORAGE_PROVIDER"
    | "STORAGE_ENDPOINT"
    | "STORAGE_ACCESS_KEY_ID"
    | "STORAGE_SECRET_ACCESS_KEY"
    | "STORAGE_BUCKET_NAME"
    | "STORAGE_PUBLIC_URL"
    | "STORAGE_REGION"
  >
>;

export function getStorageProvider(
  envOverride: StorageEnv = env,
  nodeEnv: string = process.env.NODE_ENV ?? "development"
): StorageProvider {
  if (!envOverride.STORAGE_PROVIDER && isProdLike(nodeEnv)) {
    throw new MissingProviderConfigError("storage", "STORAGE_PROVIDER");
  }
  const provider = envOverride.STORAGE_PROVIDER ?? "local";

  switch (provider) {
    case "local":
      return localStorageProvider();

    case "s3":
      if (!envOverride.STORAGE_ENDPOINT) {
        throw new MissingProviderConfigError("s3", "STORAGE_ENDPOINT");
      }
      if (!envOverride.STORAGE_ACCESS_KEY_ID) {
        throw new MissingProviderConfigError("s3", "STORAGE_ACCESS_KEY_ID");
      }
      if (!envOverride.STORAGE_SECRET_ACCESS_KEY) {
        throw new MissingProviderConfigError("s3", "STORAGE_SECRET_ACCESS_KEY");
      }
      if (!envOverride.STORAGE_BUCKET_NAME) {
        throw new MissingProviderConfigError("s3", "STORAGE_BUCKET_NAME");
      }
      return s3StorageProvider({
        endpoint: envOverride.STORAGE_ENDPOINT,
        accessKeyId: envOverride.STORAGE_ACCESS_KEY_ID,
        secretAccessKey: envOverride.STORAGE_SECRET_ACCESS_KEY,
        bucket: envOverride.STORAGE_BUCKET_NAME,
        publicUrl: envOverride.STORAGE_PUBLIC_URL,
        region: envOverride.STORAGE_REGION,
      });

    default:
      throw new UnknownProviderError("storage", provider);
  }
}

export type { StorageProvider } from "./types";
export type { PutObjectInput, StorageObject } from "./types";
