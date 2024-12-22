import React from 'react';
import '../layout/styles.css';

interface AdminDashboardProps {
  language?: 'zh-CN' | 'en-US';
}

const labels = {
  'zh-CN': {
    title: '管理控制台',
    overview: '系统概览',
    users: '用户管理',
    settings: '系统设置',
    stats: '统计数据'
  },
  'en-US': {
    title: 'Admin Console',
    overview: 'System Overview',
    users: 'User Management',
    settings: 'System Settings',
    stats: 'Statistics'
  }
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language = 'zh-CN'
}) => {
  const t = labels[language];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">{t.title}</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>{t.overview}</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">在线客服</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">活跃会话</span>
              <span className="stat-value">45</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>{t.users}</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">总用户数</span>
              <span className="stat-value">1,234</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">今日活跃</span>
              <span className="stat-value">89</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>{t.settings}</h3>
          <div className="card-content">
            <button className="admin-button">系统配置</button>
            <button className="admin-button">知识库管理</button>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>{t.stats}</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">响应率</span>
              <span className="stat-value">98%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">平均响应时间</span>
              <span className="stat-value">30s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
