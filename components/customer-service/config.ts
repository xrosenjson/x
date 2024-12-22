import { config as baseConfig } from '../../src/config';

export const config = {
  ...baseConfig,
  defaultLanguage: 'zh-CN' as const,
  supportedLanguages: ['zh-CN', 'en-US'] as const,
};

export type Language = (typeof config.supportedLanguages)[number];
export type TimeRange = 'day' | 'week' | 'month';
