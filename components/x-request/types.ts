export interface XRequestParams {
  messages?: Array<{ role: string; content: string }>;
  content?: string;
  role?: string;
  language?: 'zh-CN' | 'en-US';
  channel?: string;
  stream?: boolean;
  model?: string;
  baseURL?: string;
  // Knowledge base fields
  question?: string;
  answer?: string;
  category?: string;
  // Analytics fields
  timeRange?: 'day' | 'week' | 'month';
}
