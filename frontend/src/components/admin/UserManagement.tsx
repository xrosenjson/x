import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { toast } from '../../components/ui/use-toast';
import { Loading } from '../common/Loading';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface User {
  id: number;
  username: string;
  email: string;
  membership_type: string;
  last_login: string;
  is_active: boolean;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get<User[]>('/api/v1/admin/users');
      const data = response.data;
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: number, action: 'active' | 'suspended' | 'banned') => {
    try {
      if (action === 'active') {
        await apiClient.post(`/api/v1/admin/users/${userId}/activate`);
      } else if (action === 'suspended') {
        await apiClient.post(`/api/v1/admin/users/${userId}/deactivate`);
      } else if (action === 'banned') {
        await apiClient.delete(`/api/v1/admin/users/${userId}`);
      }
      
      toast({
        title: 'Success',
        description: 'User status updated successfully',
      });
      
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <Loading message="Loading users..." />;

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.membership_type}</TableCell>
                  <TableCell>{new Date(user.last_login).toLocaleString()}</TableCell>
                  <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {!user.is_active && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(user.id, 'active')}
                        >
                          Activate
                        </Button>
                      )}
                      {user.is_active && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                        >
                          Deactivate
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(user.id, 'banned')}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};
