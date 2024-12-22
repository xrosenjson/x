import React from 'react';
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

// Query parameters interface
interface AnalyticsQueryParams {
  timeRange: TimeRange;
  language: Language;
}

// Analytics response interface matches backend model
interface AnalyticsResponse {
  total_conversations: number;
  average_response_time: number;
  satisfaction_rate: number;
  channel_distribution: Record<string, number>;
}

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
      const queryParams = new URLSearchParams({
        timeRange: (timeRange || 'day') as TimeRange,
        language: (language || 'zh-CN') as Language,
      }).toString();

      const response = await fetch(`${config.backendUrl}/analytics?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = (await response.json()) as AnalyticsResponse;
        setAnalytics({
          totalConversations: data.total_conversations,
          averageResponseTime: data.average_response_time,
          satisfactionRate: data.satisfaction_rate * 100,
          activeUsers: data.channel_distribution?.web || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange, language, fetchAnalytics]);

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
