export interface XRequestParams {
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  model?: string;
  baseURL?: string;
}
