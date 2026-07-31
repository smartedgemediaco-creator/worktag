import { randomUUID } from "node:crypto";
import { config } from "@/config";
import { ProviderError, getStorageProvider } from "@/infra";

const DATA_URL_PATTERN = /^data:([\w/.+-]+);base64,(.+)$/i;

export async function uploadImage(image: string, folder?: string): Promise<string> {
  const match = image.match(DATA_URL_PATTERN);
  const mimeType = match?.[1] ?? "image/png";
  const base64 = match?.[2] ?? image;

  if (!(config.upload.allowedImageTypes as readonly string[]).includes(mimeType)) {
    throw new ProviderError(`Unsupported image type: ${mimeType}`);
  }

  const buffer = Buffer.from(base64, "base64");

  if (buffer.byteLength > config.upload.maxFileSize) {
    throw new ProviderError(`Image exceeds the ${config.upload.maxFileSize} byte limit`);
  }

  const extension = mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "png";
  const key = [
    folder ?? "worktag",
    new Date().toISOString().slice(0, 10),
    `${randomUUID()}.${extension}`,
  ].join("/");

  const storage = getStorageProvider();
  return storage.put({ key, body: buffer, contentType: mimeType });
}
