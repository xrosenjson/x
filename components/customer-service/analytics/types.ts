import type { XRequestParams } from '../../../components/x-request';

export interface AnalyticsResponse {
  total_conversations: number;
  average_duration: number;
  response_time: number;
  resolution_rate: number;
  satisfaction_rate: number;
  recommendation_rate: number;
  weekly_growth: number;
  monthly_growth: number;
}

export interface AnalyticsParams extends XRequestParams {
  channel?: string;
  timeRange?: 'day' | 'week' | 'month';
  startDate?: string;
  endDate?: string;
}
