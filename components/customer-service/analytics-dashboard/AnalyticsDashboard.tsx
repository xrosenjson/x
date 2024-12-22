import React from 'react';
import type { XRequestParams } from '../../x-request';
import { config } from '../config';

interface AnalyticsData {
  totalConversations: number;
  averageResponseTime: number;
  satisfactionRate: number;
  activeUsers: number;
}

interface AnalyticsDashboardProps {
  timeRange?: TimeRange;
  language?: Language;
}

type TimeRange = 'day' | 'week' | 'month';
type Language = 'zh-CN' | 'en-US';

interface AnalyticsRequestParams extends XRequestParams {
  timeRange: TimeRange;
  language: Language;
}

// Response type for analytics API
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Use ApiResponse<AnalyticsData> directly in fetchAnalytics

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  timeRange = 'day',
  language = 'zh-CN',
}) => {
  const [analytics, setAnalytics] = React.useState<AnalyticsData>({
    totalConversations: 0,
    averageResponseTime: 0,
    satisfactionRate: 0,
    activeUsers: 0,
  });

  const fetchAnalytics = async (): Promise<void> => {
    try {
      const params: AnalyticsRequestParams = {
        timeRange: (timeRange || 'day') as TimeRange,
        language: (language || 'zh-CN') as Language,
      };

      const response = await fetch(`${config.backendUrl}/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = (await response.json()) as ApiResponse<AnalyticsData>;
        if (result.success) {
          setAnalytics(result.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="analytics-dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>{language === 'zh-CN' ? '总对话数' : 'Total Conversations'}</h3>
          <p>{analytics.totalConversations}</p>
        </div>
        <div className="metric-card">
          <h3>{language === 'zh-CN' ? '平均响应时间' : 'Avg Response Time'}</h3>
          <p>{analytics.averageResponseTime}s</p>
        </div>
        <div className="metric-card">
          <h3>{language === 'zh-CN' ? '满意度' : 'Satisfaction Rate'}</h3>
          <p>{analytics.satisfactionRate}%</p>
        </div>
        <div className="metric-card">
          <h3>{language === 'zh-CN' ? '活跃用户' : 'Active Users'}</h3>
          <p>{analytics.activeUsers}</p>
        </div>
      </div>
    </div>
  );
};
