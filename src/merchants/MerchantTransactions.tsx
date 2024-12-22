import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';

const MerchantTransactions: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [dateRange, setDateRange] = React.useState('');
  const [transactions, setTransactions] = React.useState([
    {
      id: 'T001',
      merchantId: 'M001',
      merchantName: '测试商户1',
      amount: 1000.00,
      type: '收入',
      status: '已完成',
      time: '2024-01-17 09:15:00',
    },
    {
      id: 'T002',
      merchantId: 'M002',
      merchantName: '测试商户2',
      amount: 2000.00,
      type: '支出',
      status: '已完成',
      time: '2024-01-17 10:20:00',
    },
  ]);

  const handleSearch = () => {
    const filteredTransactions = transactions.filter(transaction => {
      const matchId = !searchId || transaction.merchantId.toLowerCase().includes(searchId.toLowerCase());
      const matchName = !searchName || transaction.merchantName.toLowerCase().includes(searchName.toLowerCase());
      const matchDate = !dateRange || transaction.time.includes(dateRange);
      return matchId && matchName && matchDate;
    });
    setTransactions(filteredTransactions);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">资金流水</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search filters */}
            <div className="flex items-center space-x-4">
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
              <input
                type="date"
                className="px-3 py-2 border rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
              <button 
                className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877A]"
                onClick={handleSearch}
              >
                搜索
              </button>
            </div>

            {/* Transactions table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      流水号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      时间
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.merchantId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.merchantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.type === '收入'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantTransactions;
