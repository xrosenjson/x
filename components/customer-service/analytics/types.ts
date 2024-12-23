import { Dayjs } from 'dayjs';

export interface AnalyticsParams {
  channel?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'week' | 'month';
}

export interface TimeSeriesDataPoint {
  date: string;
  conversations: number;
  activeUsers: number;
  responseTime: number;
  satisfaction: number;
}

export interface ChannelStats {
  conversations: number;
  percentage: number;
  avgResponseTime: number;
  satisfactionRate: number;
}

export interface AnalyticsResponse {
  // Summary statistics
  totalConversations: number;
  averageDuration: number;
  responseTime: number;
  satisfactionRate: number;
  activeUsers: number;

  // Distribution data
  channelDistribution: {
    [key: string]: ChannelStats;
  };
  timeDistribution: {
    [key: string]: number;
  };

  // Time series data for charts
  timeSeriesData: TimeSeriesDataPoint[];

  // Common queries analysis
  commonQueries: Array<{
    query: string;
    count: number;
    category?: string;
  }>;
}

// Dashboard specific types
export interface DashboardFilters {
  dateRange: [Dayjs, Dayjs] | null;
  channel: string;
  groupBy: 'day' | 'week' | 'month';
}

export interface DashboardMetrics {
  total: number;
  trend: number;
  previousPeriod: number;
}

export interface AnalyticsDashboardProps {
  className?: string;
  onFilterChange?: (filters: DashboardFilters) => void;
  loading?: boolean;
}
