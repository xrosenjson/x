// Import styles
import './styles.css';

// Export all modules
export * from './dialogue-engine/DialogueEngine';
export * from './knowledge-base/KnowledgeBase';
export * from './multi-channel/MultiChannel';
export * from './analytics-dashboard/AnalyticsDashboard';

// Export common types
export interface CommonProps {
  language?: 'zh-CN' | 'en-US';
  apiKey?: string;
  baseURL?: string;
  model?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

// Constants
export const DEFAULT_LANGUAGE = 'zh-CN';
export const SUPPORTED_CHANNELS = ['web', 'wechat', 'app'] as const;
export const ANALYTICS_TIME_RANGES = ['day', 'week', 'month'] as const;
