import React from 'react';
import { Card, Table } from 'antd';
import { generateExportData } from '@/data/systemMockData';

const ExportConvert: React.FC = () => {
  const columns = [
    { title: '文件名', dataIndex: 'fileName', key: 'fileName' },
    { title: '导出时间', dataIndex: 'exportTime', key: 'exportTime' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877a]">下载</button>
          <button className="text-red-600 hover:text-red-700">删除</button>
        </div>
      ),
    },
  ];

  const data = generateExportData(10);

  return (
    <div className="p-6">
      <Card 
        title="转换与导出"
        extra={
          <div className="flex gap-4">
            <input 
              type="date" 
              className="px-3 py-2 border rounded-md"
            />
            <input 
              type="date" 
              className="px-3 py-2 border rounded-md"
            />
            <select className="px-3 py-2 border rounded-md">
              <option value="">全部商户</option>
            </select>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              导出Excel
            </button>
            <button className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]">
              导出CSV
            </button>
          </div>
        }
      >
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">导出历史</h3>
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
        </div>
      </Card>
    </div>
  );
};

export default ExportConvert;
