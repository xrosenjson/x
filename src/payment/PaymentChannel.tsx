import React from 'react';
import { Card, Table } from 'antd';
import { generatePaymentChannelData } from '@/data/systemMockData';

const PaymentChannel: React.FC = () => {
  const columns = [
    { title: '通道ID', dataIndex: 'channelId', key: 'channelId' },
    { title: '通道名称', dataIndex: 'channelName', key: 'channelName' },
    { title: '通道标识', dataIndex: 'identifier', key: 'identifier' },
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
    { 
      title: '费率', 
      dataIndex: 'rate', 
      key: 'rate',
      render: (rate: number) => `${(rate * 100).toFixed(3)}%`
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

  const data = generatePaymentChannelData(10);

  return (
    <div className="p-6">
      <Card 
        title="支付通道"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="通道名称" 
              className="px-3 py-2 border rounded-md"
            />
            <select className="px-3 py-2 border rounded-md">
              <option value="">全部状态</option>
              <option value="active">启用</option>
              <option value="inactive">禁用</option>
            </select>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              添加通道
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

export default PaymentChannel;
