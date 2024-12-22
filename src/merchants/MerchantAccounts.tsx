import React from 'react';
import { Card, Table } from 'antd';

const MerchantAccounts: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [merchants, setMerchants] = React.useState([
    {
      id: 'M001',
      name: '测试商户1',
      balance: 10000.00,
      status: '正常',
    },
    {
      id: 'M002',
      name: '测试商户2',
      balance: 25000.00,
      status: '正常',
    },
    {
      id: 'M003',
      name: '测试商户3',
      balance: 5000.00,
      status: '待审核',
    },
  ]);

  const handleSearch = () => {
    const filteredMerchants = merchants.filter(merchant => {
      const matchId = !searchId || merchant.id.toLowerCase().includes(searchId.toLowerCase());
      const matchName = !searchName || merchant.name.toLowerCase().includes(searchName.toLowerCase());
      return matchId && matchName;
    });
    setMerchants(filteredMerchants);
  };

  const columns = [
    { title: '商户ID', dataIndex: 'id', key: 'id' },
    { title: '商户名称', dataIndex: 'name', key: 'name' },
    { 
      title: '余额', 
      dataIndex: 'balance', 
      key: 'balance',
      render: (balance: number) => `¥${balance.toFixed(2)}`
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === '正常' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <button className="text-[#009688] hover:text-[#00877A]">编辑</button>
          <button className="text-red-600 hover:text-red-700">删除</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card 
        title="商户账户管理"
        extra={
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="商户ID"
              className="px-3 py-2 border rounded-md"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <input
              type="text"
              placeholder="商户名称"
              className="px-3 py-2 border rounded-md"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button 
              className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877A]"
              onClick={handleSearch}
            >
              搜索
            </button>
          </div>
        }
      >
        <Table 
          columns={columns} 
          dataSource={merchants}
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

export default MerchantAccounts;
