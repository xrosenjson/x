import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { config } from '../../../src/config';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'agent' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UserFormData {
  username: string;
  role: 'admin' | 'agent' | 'user';
  password?: string;
}

const { Option } = Select;

export const UsersAdmin: React.FC<{ language?: 'zh-CN' | 'en-US' }> = ({ 
  language = 'zh-CN' 
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const labels = {
    'zh-CN': {
      title: '用户管理',
      add: '添加用户',
      username: '用户名',
      role: '角色',
      status: '状态',
      actions: '操作',
      admin: '管理员',
      agent: '客服人员',
      user: '普通用户',
      active: '活跃',
      inactive: '未激活',
      edit: '编辑',
      delete: '删除',
      password: '密码',
      cancel: '取消',
      submit: '提交',
      success: '操作成功',
      error: '操作失败'
    },
    'en-US': {
      title: 'User Management',
      add: 'Add User',
      username: 'Username',
      role: 'Role',
      status: 'Status',
      actions: 'Actions',
      admin: 'Admin',
      agent: 'Agent',
      user: 'User',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      password: 'Password',
      cancel: 'Cancel',
      submit: 'Submit',
      success: 'Operation successful',
      error: 'Operation failed'
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.backendUrl}/admin/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      message.error(labels[language].error);
      console.error('Error fetching users:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (values: UserFormData) => {
    try {
      const response = await fetch(`${config.backendUrl}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to add user');
      
      message.success(labels[language].success);
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error(labels[language].error);
      console.error('Error adding user:', error);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: labels[language].username,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: labels[language].role,
      dataIndex: 'role',
      key: 'role',
      render: (role: User['role']) => labels[language][role.toLowerCase() as keyof typeof labels[typeof language]],
    },
    {
      title: labels[language].status,
      dataIndex: 'status',
      key: 'status',
      render: (status: User['status']) => labels[language][status.toLowerCase() as keyof typeof labels[typeof language]],
    },
    {
      title: labels[language].actions,
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => {/* TODO: Implement edit */}}>
            {labels[language].edit}
          </Button>
          <Button type="link" danger onClick={() => {/* TODO: Implement delete */}}>
            {labels[language].delete}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="users-admin">
      <div className="users-admin-header">
        <h2>{labels[language].title}</h2>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          {labels[language].add}
        </Button>
      </div>

      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      {error ? (
        <div className="error-state">
          <h3>{language === 'zh-CN' ? '获取用户数据失败' : 'Failed to fetch users'}</h3>
          <p>{error}</p>
          <Button type="primary" onClick={fetchUsers}>
            {language === 'zh-CN' ? '重试' : 'Retry'}
          </Button>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}


      <Modal
        title={labels[language].add}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            name="username"
            label={labels[language].username}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label={labels[language].role}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="admin">{labels[language].admin}</Option>
              <Option value="agent">{labels[language].agent}</Option>
              <Option value="user">{labels[language].user}</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label={labels[language].password}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {labels[language].submit}
            </Button>
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => {
                setModalVisible(false);
                form.resetFields();
              }}
            >
              {labels[language].cancel}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
