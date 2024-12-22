import React from 'react';
import { Card, Table } from 'antd';
import { generateWeightData } from '@/data/systemMockData';

const ElasticWeight: React.FC = () => {
  const columns = [
    { title: '通道ID', dataIndex: 'channelId', key: 'channelId' },
    { title: '通道名称', dataIndex: 'channelName', key: 'channelName' },
    { title: '当前权重', dataIndex: 'currentWeight', key: 'currentWeight' },
    { title: '最小权重', dataIndex: 'minWeight', key: 'minWeight' },
    { title: '最大权重', dataIndex: 'maxWeight', key: 'maxWeight' },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
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

  const data = generateWeightData(10);

  return (
    <div className="p-6">
      <Card 
        title="弹性权重"
        extra={
          <div className="flex gap-4">
            <select className="px-3 py-2 border rounded-md">
              <option value="">选择通道</option>
            </select>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              搜索
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              设置权重
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

export default ElasticWeight;
