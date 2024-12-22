import React from 'react';
import { Card, Table } from 'antd';
import { generateMessageData } from '@/data/systemMockData';

const MessageManagement: React.FC = () => {
  const columns = [
    { title: '消息ID', dataIndex: 'messageId', key: 'messageId' },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '内容', dataIndex: 'content', key: 'content' },
    { title: '发送时间', dataIndex: 'sendTime', key: 'sendTime' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">查看</button>
          <button className="text-red-600 hover:text-red-700">删除</button>
        </div>
      ),
    },
  ];

  const data = generateMessageData(10);

  return (
    <div className="p-6">
      <Card 
        title="消息管理"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="消息标题" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              发送消息
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

export default MessageManagement;
