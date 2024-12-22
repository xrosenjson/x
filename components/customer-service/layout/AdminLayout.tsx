import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import type { Language } from '../config';
import { AdminDashboard } from '../admin/AdminDashboard';
import { KnowledgeBaseAdmin } from '../knowledge-base/KnowledgeBaseAdmin';
import { AnalyticsDashboardAdmin } from '../analytics/AnalyticsDashboardAdmin';
import { UsersAdmin } from '../admin/UsersAdmin';
import './styles.css';

type MenuItem = {
  key: string;
  label: string;
  icon: string;
  onClick?: () => void;
};

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
  language?: Language;
}

const menuItems = {
  'zh-CN': [
    { key: '/', label: '智能客服', icon: '💬' },
    { key: '/admin', label: '管理控制台', icon: '⚙️' },
    { key: '/users', label: '用户管理', icon: '👥' },
    { key: '/knowledge', label: '知识库', icon: '📚' },
    { key: '/analytics', label: '数据分析', icon: '📊' }
  ],
  'en-US': [
    { key: '/', label: 'Customer Service', icon: '💬' },
    { key: '/admin', label: 'Admin Console', icon: '⚙️' },
    { key: '/users', label: 'User Management', icon: '👥' },
    { key: '/knowledge', label: 'Knowledge Base', icon: '📚' },
    { key: '/analytics', label: 'Analytics', icon: '📊' }
  ]
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  language = 'zh-CN'
}) => {
  const [currentPath, setCurrentPath] = useState('/');
  const handleMenuClick = (key: string) => {
    setCurrentPath(key);
  };

  const items: MenuItem[] = menuItems[language].map(item => ({
    ...item,
    onClick: () => handleMenuClick(item.key)
  }));

  const renderContent = () => {
    switch (currentPath) {
      case '/admin':
        return <AdminDashboard language={language} />;
      case '/users':
        return <UsersAdmin language={language} />;
      case '/knowledge':
        return <KnowledgeBaseAdmin language={language} />;
      case '/analytics':
        return <AnalyticsDashboardAdmin language={language} />;
      default:
        return children;
    }
  };
  
  return (
    <Layout className="admin-layout">
      <Header className="header">
        <div className="logo" onClick={() => handleMenuClick('/')}>
          {language === 'zh-CN' ? '智能客服平台' : 'AI Customer Service Platform'}
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[currentPath]}
            style={{ height: '100%', borderRight: 0 }}
            items={items.map(item => ({
              ...item,
              onClick: () => handleMenuClick(item.key)
            }))}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content className="site-layout-background">
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
