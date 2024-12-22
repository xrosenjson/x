import React from 'react';
import { Card, Table } from 'antd';
import { generatePayoutReissueData } from '../../data/systemMockData';

const PayoutReissueRecords: React.FC = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
    { title: '商户ID', dataIndex: 'merchantId', key: 'merchantId' },
    { title: '补单状态', dataIndex: 'status', key: 'status' },
    { title: '补单时间', dataIndex: 'reissueTime', key: 'reissueTime' },
    { title: '操作员', dataIndex: 'operator', key: 'operator' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">查看</button>
        </div>
      ),
    },
  ];

  const data = generatePayoutReissueData(10);

  return (
    <div className="p-6">
      <Card 
        title="代付补单记录"
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

export default PayoutReissueRecords;
