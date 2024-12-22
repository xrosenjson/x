import React from 'react';
import { Card, Table } from 'antd';
import { generatePayoutOrderData } from '../../data/systemMockData';

const PayoutOrders: React.FC = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
    { title: '商户ID', dataIndex: 'merchantId', key: 'merchantId' },
    { title: '代付金额', dataIndex: 'amount', key: 'amount' },
    { title: '手续费', dataIndex: 'fee', key: 'fee' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">查看</button>
          <button className="text-[#009688] hover:text-[#00877a]">补单</button>
        </div>
      ),
    },
  ];

  const data = generatePayoutOrderData(10);

  return (
    <div className="p-6">
      <Card 
        title="代付订单"
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
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              导出
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

export default PayoutOrders;
