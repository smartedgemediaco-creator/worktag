export interface PutObjectInput {
  key: string;
  body: Uint8Array | Buffer | string;
  contentType?: string;
}

export interface StorageObject {
  key: string;
  body: Buffer;
  contentType?: string;
}

export interface StorageProvider {
  readonly name: string;
  put(input: PutObjectInput): Promise<string>;
  get(key: string): Promise<StorageObject | null>;
  delete(key: string): Promise<void>;
}
