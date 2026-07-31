import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import type { PutObjectInput, StorageObject, StorageProvider } from "./types";

export interface S3StorageConfig {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl?: string;
  region?: string;
}

export function s3StorageProvider(config: S3StorageConfig): StorageProvider {
  const client = new S3Client({
    region: config.region ?? "auto",
    endpoint: config.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  function toUrl(key: string): string {
    if (config.publicUrl) {
      return `${config.publicUrl.replace(/\/+$/, "")}/${key}`;
    }
    return `${config.endpoint.replace(/\/+$/, "")}/${config.bucket}/${key}`;
  }

  return {
    name: "s3",

    async put(input: PutObjectInput): Promise<string> {
      await client.send(
        new PutObjectCommand({
          Bucket: config.bucket,
          Key: input.key,
          Body: Buffer.from(input.body),
          ContentType: input.contentType,
        })
      );
      return toUrl(input.key);
    },

    async get(key: string): Promise<StorageObject | null> {
      const result = await client.send(
        new GetObjectCommand({ Bucket: config.bucket, Key: key })
      );

      const body = result.Body;
      if (!body) return null;

      const bytes = await body.transformToByteArray();
      return {
        key,
        body: Buffer.from(bytes),
        contentType: result.ContentType,
      };
    },

    async delete(key: string): Promise<void> {
      await client.send(
        new DeleteObjectCommand({ Bucket: config.bucket, Key: key })
      );
    },
  };
}
