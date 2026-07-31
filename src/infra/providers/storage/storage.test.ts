import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { MissingProviderConfigError, ProviderError } from "@/infra/errors";
import { getStorageProvider } from "@/infra/providers/storage";
import { localStorageProvider } from "@/infra/providers/storage/local";

const { s3SendMock, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3Client } =
  vi.hoisted(() => {
  const sendMock = vi.fn();
  class PutObjectCommand {
    input: unknown;
    constructor(input: unknown) {
      this.input = input;
    }
  }
  class GetObjectCommand {
    input: unknown;
    constructor(input: unknown) {
      this.input = input;
    }
  }
  class DeleteObjectCommand {
    input: unknown;
    constructor(input: unknown) {
      this.input = input;
    }
  }
  class S3Client {
    async send(command: unknown) {
      return sendMock(command);
    }
  }
  return { s3SendMock: sendMock, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3Client };
});

vi.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
}));

describe("getStorageProvider", () => {
  it("defaults to the local adapter in non-production", () => {
    const provider = getStorageProvider({}, "development");
    expect(provider.name).toBe("local");
  });

  it("defaults to s3 in production and requires credentials", () => {
    expect(() => getStorageProvider({}, "production")).toThrow(MissingProviderConfigError);
  });

  it("returns the s3 adapter when configured", () => {
    const provider = getStorageProvider(
      {
        STORAGE_PROVIDER: "s3",
        STORAGE_ENDPOINT: "https://cdn.example.com",
        STORAGE_ACCESS_KEY_ID: "key",
        STORAGE_SECRET_ACCESS_KEY: "secret",
        STORAGE_BUCKET_NAME: "bucket",
      },
      "development"
    );
    expect(provider.name).toBe("s3");
  });
});

describe("local storage adapter", () => {
  it("round-trips objects through the local filesystem", async () => {
    const baseDir = await mkdtemp(join(tmpdir(), "worktag-storage-"));
    const storage = localStorageProvider({ baseDir });

    try {
      const url = await storage.put({
        key: "worktag/2026-07-31/abc.png",
        body: Buffer.from("hello"),
        contentType: "image/png",
      });
      expect(url).toBe("/uploads/worktag/2026-07-31/abc.png");

      const object = await storage.get("worktag/2026-07-31/abc.png");
      expect(object?.body.toString()).toBe("hello");
      expect(object?.contentType).toBe("image/png");

      await storage.delete("worktag/2026-07-31/abc.png");
      await expect(storage.get("worktag/2026-07-31/abc.png")).resolves.toBeNull();
    } finally {
      await rm(baseDir, { recursive: true, force: true });
    }
  });

  it("rejects path traversal keys", async () => {
    const baseDir = await mkdtemp(join(tmpdir(), "worktag-storage-"));
    const storage = localStorageProvider({ baseDir });

    try {
      await expect(storage.put({ key: "../../escape.txt", body: "nope" })).rejects.toThrow(
        ProviderError
      );
    } finally {
      await rm(baseDir, { recursive: true, force: true });
    }
  });
});

describe("s3 storage adapter", () => {
  it("puts objects with the right bucket/key and returns the public url", async () => {
    s3SendMock.mockReset();
    s3SendMock.mockResolvedValue({});

    const { s3StorageProvider } = await import("./s3");

    const storage = s3StorageProvider({
      endpoint: "https://r2.example.com",
      accessKeyId: "key",
      secretAccessKey: "secret",
      bucket: "worktag",
      publicUrl: "https://cdn.worktag.app",
    });

    const url = await storage.put({
      key: "avatars/1.png",
      body: Buffer.from("img"),
      contentType: "image/png",
    });

    expect(url).toBe("https://cdn.worktag.app/avatars/1.png");

    const [command] = s3SendMock.mock.calls[0] as [{ input: Record<string, unknown> }];
    expect(command.input).toMatchObject({
      Bucket: "worktag",
      Key: "avatars/1.png",
      ContentType: "image/png",
    });
  });
});
