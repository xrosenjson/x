import React from 'react';
import { Card, Table } from 'antd';
import { generateOperationLogData } from '@/data/systemMockData';

const OperationLog: React.FC = () => {
  const columns = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '用户IP', dataIndex: 'userIp', key: 'userIp' },
    { title: '系统', dataIndex: 'system', key: 'system' },
    { title: '业务描述', dataIndex: 'description', key: 'description' },
    { title: '方法', dataIndex: 'method', key: 'method' },
    { title: '请求参数', dataIndex: 'requestParams', key: 'requestParams' },
    { title: '响应结果', dataIndex: 'responseResult', key: 'responseResult' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  const data = generateOperationLogData(10);

  return (
    <div className="p-6">
      <Card 
        title="操作日志"
        className="w-full"
        extra={
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="用户名"
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

export default OperationLog;
