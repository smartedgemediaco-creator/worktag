import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { ProviderError } from "@/infra/errors";
import type { PutObjectInput, StorageObject, StorageProvider } from "./types";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".json": "application/json",
};

function sanitizeKey(key: string): string {
  const normalized = normalize(key.replaceAll("\\", sep));
  if (normalized === ".." || normalized.startsWith(`..${sep}`) || normalized.startsWith(".")) {
    throw new ProviderError(`Storage key must stay within the uploads directory: ${key}`);
  }
  return normalized;
}

export interface LocalStorageConfig {
  baseDir?: string;
}

export function localStorageProvider(config: LocalStorageConfig = {}): StorageProvider {
  const baseDir = resolve(config.baseDir ?? join(process.cwd(), "public", "uploads"));

  return {
    name: "local",

    async put(input: PutObjectInput): Promise<string> {
      const key = sanitizeKey(input.key);
      const filePath = join(baseDir, key);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, Buffer.from(input.body));
      return `/uploads/${key.replaceAll(sep, "/")}`;
    },

    async get(key: string): Promise<StorageObject | null> {
      const filePath = join(baseDir, sanitizeKey(key));
      try {
        const body = await readFile(filePath);
        return {
          key,
          body,
          contentType: MIME_TYPES[extname(key).toLowerCase()] ?? "application/octet-stream",
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw error;
      }
    },

    async delete(key: string): Promise<void> {
      const filePath = join(baseDir, sanitizeKey(key));
      try {
        await unlink(filePath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
    },
  };
}
