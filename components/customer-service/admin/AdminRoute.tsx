import { Spin } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { Language } from '../config';
import { messages } from '../config';
import { useAuth } from '../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
  language?: Language;
}

// Using centralized messages from config

export const AdminRoute: React.FC<AdminRouteProps> = ({ children, language = 'zh-CN' }) => {
  const { user, loading, error } = useAuth(language);
  const t = messages[language];

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
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
          message: t.sessionExpired,
          from: window.location.pathname,
        }}
      />
    );
  }

  if (user.role !== 'admin') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h2>{t.accessDenied}</h2>
        <p>{t.unauthorized}</p>
      </div>
    );
  }

  return <>{children}</>;
};
