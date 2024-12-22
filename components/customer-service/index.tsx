export * from './dialogue-engine/DialogueEngine';
export * from './knowledge-base/KnowledgeBase';
export * from './multi-channel/MultiChannel';
export * from './analytics-dashboard/AnalyticsDashboard';
export * from './AICustomerServicePlatform';

// Common types
export interface CommonProps {
  language?: 'zh-CN' | 'en-US';
  apiKey?: string;
}
