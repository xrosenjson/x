import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserManagement } from './UserManagement';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { Loading } from '../common/Loading';
import { toast } from '../ui/use-toast';

interface DashboardStats {
  total_users: number;
  active_users: number;
  premium_users: number;
  basic_users: number;
  free_users: number;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get<DashboardStats>('/api/v1/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch dashboard statistics',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Loading message="Loading dashboard stats..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.total_users || 0}</CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.active_users || 0}</CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Premium Members</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.premium_users || 0}</CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Members</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.basic_users || 0}</CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Free Users</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.free_users || 0}</CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>New Users Today</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.new_users_today || 0}</CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>New Users This Week</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.new_users_this_week || 0}</CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>New Users This Month</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{stats?.new_users_this_month || 0}</CardContent>
          </Card>
        </div>

        <UserManagement />
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
