import React from 'react';
import '../layout/styles.css';

interface AnalyticsDashboardAdminProps {
  language?: 'zh-CN' | 'en-US';
}

const labels = {
  'zh-CN': {
    title: '数据分析',
    overview: '总览',
    performance: '性能指标',
    satisfaction: '满意度',
    trends: '趋势分析'
  },
  'en-US': {
    title: 'Analytics',
    overview: 'Overview',
    performance: 'Performance',
    satisfaction: 'Satisfaction',
    trends: 'Trends'
  }
};

export const AnalyticsDashboardAdmin: React.FC<AnalyticsDashboardAdminProps> = ({
  language = 'zh-CN'
}) => {
  const t = labels[language];

  return (
    <div className="analytics-dashboard-admin">
      <h1 className="page-title">{t.title}</h1>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>{t.overview}</h3>
          <div className="analytics-stats">
            <div className="stat-group">
              <div className="stat-item">
                <span className="stat-label">总会话数</span>
                <span className="stat-value">1,234</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">平均会话时长</span>
                <span className="stat-value">5.2分钟</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>{t.performance}</h3>
          <div className="analytics-stats">
            <div className="stat-group">
              <div className="stat-item">
                <span className="stat-label">响应速度</span>
                <span className="stat-value">30秒</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">解决率</span>
                <span className="stat-value">85%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>{t.satisfaction}</h3>
          <div className="analytics-stats">
            <div className="stat-group">
              <div className="stat-item">
                <span className="stat-label">满意度评分</span>
                <span className="stat-value">4.5/5</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">推荐度</span>
                <span className="stat-value">92%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>{t.trends}</h3>
          <div className="analytics-stats">
            <div className="stat-group">
              <div className="stat-item">
                <span className="stat-label">周同比</span>
                <span className="stat-value trend-up">+15%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">月同比</span>
                <span className="stat-value trend-up">+25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
