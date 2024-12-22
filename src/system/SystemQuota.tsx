import React from 'react';
import { Card, Table } from 'antd';
import { generateSystemQuotaData } from '@/data/systemMockData';

const SystemQuota: React.FC = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '金额', dataIndex: 'amount', key: 'amount' },
    { title: 'USDT', dataIndex: 'usdt', key: 'usdt' },
    { title: 'USDT费率', dataIndex: 'usdtRate', key: 'usdtRate' },
    { title: '备注', dataIndex: 'remarks', key: 'remarks' },
    { title: '储值前点数', dataIndex: 'pointsBefore', key: 'pointsBefore' },
    { title: '储值后点数', dataIndex: 'pointsAfter', key: 'pointsAfter' },
    { title: '帐户id', dataIndex: 'accountId', key: 'accountId' },
    { title: '帐户名称', dataIndex: 'accountName', key: 'accountName' },
    { title: 'ip', dataIndex: 'ip', key: 'ip' },
    { title: '时间', dataIndex: 'time', key: 'time' },
  ];

  const data = generateSystemQuotaData(10);

  return (
    <div className="space-y-6">
      <Card 
        title="系统额度"
        extra={
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="账户ID" 
              className="px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              设置额度
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

export default SystemQuota;
