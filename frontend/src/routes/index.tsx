import React, { lazy, Suspense } from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Loading } from '../components/common/Loading';

// Lazy loaded components with type assertions
const LoginForm = lazy(() => import('../components/auth/LoginForm') as Promise<{ default: React.ComponentType<any> }>);
const RegisterForm = lazy(() => import('../components/auth/RegisterForm') as Promise<{ default: React.ComponentType<any> }>);
const ProfilePage = lazy(() => import('../components/profile/ProfilePage') as Promise<{ default: React.ComponentType<any> }>);
const SettingsPage = lazy(() => import('../components/settings/SettingsPage') as Promise<{ default: React.ComponentType<any> }>);
const MembershipPlans = lazy(() => import('../components/membership/MembershipPlans') as Promise<{ default: React.ComponentType<any> }>);
const StreamingPlayer = lazy(() => import('../components/streaming/StreamingPlayer') as Promise<{ default: React.ComponentType<any> }>);
const DownloadManager = lazy(() => import('../components/downloads/DownloadManager') as Promise<{ default: React.ComponentType<any> }>);
const AdminDashboard = lazy(() => import('../components/admin/Dashboard') as Promise<{ default: React.ComponentType<any> }>);

// Higher-order component for Suspense and ErrorBoundary wrapping
const withSuspense = (Component: React.ComponentType<any>) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading size="large" message="Loading..." />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

// Route components with proper props
const StreamingRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return withSuspense(() => (
    <StreamingPlayer
      title={`Stream ${id}`}
      url={`/api/v1/streaming/${id}`}
      onError={(error: Error) => console.error('Streaming error:', error)}
      onProgress={(progress: number) => console.log('Stream progress:', progress)}
    />
  ));
};

const DownloadRoute: React.FC = () => {
  return withSuspense(() => (
    <DownloadManager
      downloads={[]}
      onPauseResume={(id: string) => console.log('Pause/Resume:', id)}
      onCancel={(id: string) => console.log('Cancel:', id)}
      onRetry={(id: string) => console.log('Retry:', id)}
    />
  ));
};

export const routes = (
  <>
    <Route path="/login" element={withSuspense(LoginForm)} />
    <Route path="/register" element={withSuspense(RegisterForm)} />
    <Route
      path="/membership"
      element={
        <ProtectedRoute>
          {withSuspense(MembershipPlans)}
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          {withSuspense(ProfilePage)}
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          {withSuspense(SettingsPage)}
        </ProtectedRoute>
      }
    />
    <Route
      path="/streaming/:id"
      element={
        <ProtectedRoute>
          <StreamingRoute />
        </ProtectedRoute>
      }
    />
    <Route
      path="/downloads"
      element={
        <ProtectedRoute>
          <DownloadRoute />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/login" replace />} />
  </>
);
