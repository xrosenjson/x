import React from 'react';

interface AnalyticsData {
  totalConversations: number;
  averageResponseTime: number;
  satisfactionRate: number;
  activeUsers: number;
}

interface AnalyticsDashboardProps {
  timeRange?: 'day' | 'week' | 'month';
  language?: 'zh-CN' | 'en-US';
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
      // Simulated API call - replace with actual implementation
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeRange, language }),
      });
      
      if (response.ok) {
        const data: AnalyticsData = await response.json();
        setAnalytics(data);
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
