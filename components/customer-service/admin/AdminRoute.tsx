import { Spin } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { Language } from '../config';
import { useAuth } from '../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
  language?: Language;
}

const messages: Record<
  Language,
  {
    loading: string;
    accessDenied: string;
    notAuthenticated: string;
    notAuthorized: string;
  }
> = {
  'zh-CN': {
    loading: '加载中...',
    accessDenied: '访问被拒绝',
    notAuthenticated: '请先登录',
    notAuthorized: '您没有权限访问此页面',
  },
  'en-US': {
    loading: 'Loading...',
    accessDenied: 'Access Denied',
    notAuthenticated: 'Please log in first',
    notAuthorized: 'You are not authorized to access this page',
  },
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ children, language = 'zh-CN' }) => {
  const { user, loading, error } = useAuth(language);
  const t = messages[language];

  if (loading) {
    return (
      <div className="admin-loading">
        <Spin size="large" />
        <p>{t.loading}</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: t.notAuthenticated,
          from: window.location.pathname,
        }}
      />
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="admin-error">
        <h2>{t.accessDenied}</h2>
        <p>{t.notAuthorized}</p>
      </div>
    );
  }

  return <>{children}</>;
};
