import React from 'react';
import { Card, Table } from 'antd';
import { generateResourceData } from '@/data/systemMockData';

const ResourceManagement: React.FC = () => {
  const columns = [
    { title: '资源ID', dataIndex: 'resourceId', key: 'resourceId' },
    { title: '资源名称', dataIndex: 'resourceName', key: 'resourceName' },
    { title: '资源类型', dataIndex: 'resourceType', key: 'resourceType' },
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

  const data = generateResourceData(10);

  return (
    <div className="p-6">
      <Card 
        title="资源管理"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="资源名称" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              添加资源
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

export default ResourceManagement;
