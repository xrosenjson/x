import React from 'react';
import { Card, Table } from 'antd';
import { generateUserData } from '@/data/systemMockData';

const UserManagement: React.FC = () => {
  const columns = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">编辑</button>
          <button className="text-red-600 hover:text-red-700">删除</button>
        </div>
      ),
    },
  ];

  const data = generateUserData(10);

  return (
    <div className="p-6">
      <Card 
        title="用户管理"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="用户名" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              添加用户
            </button>
          </div>
        }
      >
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={{ 
            total: 100,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default UserManagement;
