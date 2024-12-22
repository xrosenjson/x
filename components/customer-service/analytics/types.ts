import { Dayjs } from 'dayjs';

export interface AnalyticsParams {
  channel?: string;
  startDate?: string;
  endDate?: string;
}

export interface AnalyticsResponse {
  totalConversations: number;
  averageDuration: number;
  responseTime: number;
  satisfactionRate: number;
  channelDistribution: {
    [key: string]: number;
  };
  timeDistribution: {
    [key: string]: number;
  };
  commonQueries: Array<{
    query: string;
    count: number;
  }>;
}
