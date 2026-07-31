export interface SendSmsInput {
  to: string;
  message: string;
  senderId?: string;
}

export interface SendSmsResult {
  id?: string;
}

export interface SmsProvider {
  readonly name: string;
  send(input: SendSmsInput): Promise<SendSmsResult>;
}
