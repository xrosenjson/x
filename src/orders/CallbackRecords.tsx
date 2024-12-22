import React from 'react';
import { Card, Table } from 'antd';
import { generateCallbackData } from '@/data/systemMockData';

const CallbackRecords: React.FC = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
    { title: '商户ID', dataIndex: 'merchantId', key: 'merchantId' },
    { title: '回调状态', dataIndex: 'status', key: 'status' },
    { title: '回调次数', dataIndex: 'count', key: 'count' },
    { title: '最后回调时间', dataIndex: 'lastTime', key: 'lastTime' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">重试</button>
          <button className="text-red-600 hover:text-red-700">删除</button>
        </div>
      ),
    },
  ];

  const data = generateCallbackData(10);

  return (
    <div className="p-6">
      <Card 
        title="回调记录"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="订单号" 
              className="px-3 py-2 border rounded-md"
            />
            <input 
              type="text" 
              placeholder="商户ID" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
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

export default CallbackRecords;
