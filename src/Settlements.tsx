import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';

const Settlements: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchMerchant, setSearchMerchant] = React.useState('');
  const [dateRange, setDateRange] = React.useState('');
  const [settlements] = React.useState([
    {
      id: 'S001',
      merchantId: 'M001',
      merchantName: '测试商户1',
      amount: 50000.00,
      fee: 300.00,
      actualAmount: 49700.00,
      status: '待审核',
      createTime: '2024-01-15 10:00:00',
      settleTime: '-',
      bankInfo: '招商银行 6225xxxx xxxx1234',
    },
    {
      id: 'S002',
      merchantId: 'M002',
      merchantName: '测试商户2',
      amount: 75000.00,
      fee: 450.00,
      actualAmount: 74550.00,
      status: '已完成',
      createTime: '2024-01-15 11:00:00',
      settleTime: '2024-01-15 14:30:00',
      bankInfo: '工商银行 6222xxxx xxxx5678',
    },
  ]);

  const handleSearch = () => {
    // Implement search logic
    console.log('Search with:', { searchId, searchMerchant, dateRange });
  };

  const handleApprove = (settlementId: string) => {
    // Implement approval logic
    console.log('Approve settlement:', settlementId);
  };

  const handleReject = (settlementId: string) => {
    // Implement rejection logic
    console.log('Reject settlement:', settlementId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">结算管理</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search filters */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="结算单号"
                className="px-3 py-2 border rounded-md"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <input
                type="text"
                placeholder="商户名称/ID"
                className="px-3 py-2 border rounded-md"
                value={searchMerchant}
                onChange={(e) => setSearchMerchant(e.target.value)}
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

            {/* Settlements table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      结算单号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      结算金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手续费
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      实际金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      申请时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      结算时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      收款账户
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {settlements.map((settlement) => (
                    <tr key={settlement.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.merchantId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.merchantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{settlement.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{settlement.fee.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{settlement.actualAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          settlement.status === '已完成' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {settlement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.createTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.settleTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.bankInfo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {settlement.status === '待审核' && (
                          <>
                            <button 
                              className="text-[#009688] hover:text-[#00877A] mr-2"
                              onClick={() => handleApprove(settlement.id)}
                            >
                              通过
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleReject(settlement.id)}
                            >
                              拒绝
                            </button>
                          </>
                        )}
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

export default Settlements;
