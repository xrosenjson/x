import React from 'react';
import { Card, Table } from 'antd';
import { generateChannelIdentifierData } from '@/data/systemMockData';

const ChannelIdentifier: React.FC = () => {
  const columns = [
    { title: '标识ID', dataIndex: 'identifierId', key: 'identifierId' },
    { title: '标识名称', dataIndex: 'identifierName', key: 'identifierName' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span className={status === '启用' ? 'text-[#009688]' : 'text-red-600'}>
          {status}
        </span>
      )
    },
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

  const data = generateChannelIdentifierData(10);

  return (
    <div className="p-6">
      <Card 
        title="通道标识"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="标识名称" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              添加标识
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
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default ChannelIdentifier;
