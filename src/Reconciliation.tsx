import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';

const Reconciliation: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchMerchant, setSearchMerchant] = React.useState('');
  const [dateRange, setDateRange] = React.useState('');
  const [reconciliations] = React.useState([
    {
      id: 'R001',
      merchantId: 'M001',
      merchantName: '测试商户1',
      date: '2024-01-15',
      totalOrders: 156,
      totalAmount: 78050.00,
      matchedOrders: 152,
      matchedAmount: 76050.00,
      unmatchedOrders: 4,
      unmatchedAmount: 2000.00,
      status: '待处理',
      createTime: '2024-01-16 10:00:00',
    },
    {
      id: 'R002',
      merchantId: 'M002',
      merchantName: '测试商户2',
      date: '2024-01-15',
      totalOrders: 245,
      totalAmount: 125000.00,
      matchedOrders: 245,
      matchedAmount: 125000.00,
      unmatchedOrders: 0,
      unmatchedAmount: 0.00,
      status: '已完成',
      createTime: '2024-01-16 11:00:00',
    },
  ]);

  const handleSearch = () => {
    // Implement search logic
    console.log('Search with:', { searchId, searchMerchant, dateRange });
  };

  const handleDownload = (reconciliationId: string) => {
    // Implement download logic
    console.log('Download reconciliation:', reconciliationId);
  };

  const handleProcess = (reconciliationId: string) => {
    // Implement processing logic
    console.log('Process reconciliation:', reconciliationId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">对账管理</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search filters */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="对账单号"
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

            {/* Reconciliation table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      对账单号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      对账日期
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      总订单数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      总金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      已匹配订单
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      已匹配金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      未匹配订单
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      未匹配金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reconciliations.map((reconciliation) => (
                    <tr key={reconciliation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.merchantId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.merchantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{reconciliation.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.matchedOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{reconciliation.matchedAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.unmatchedOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{reconciliation.unmatchedAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reconciliation.status === '已完成'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reconciliation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reconciliation.createTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleDownload(reconciliation.id)}
                        >
                          下载
                        </button>
                        {reconciliation.status === '待处理' && (
                          <button 
                            className="text-[#009688] hover:text-[#00877A]"
                            onClick={() => handleProcess(reconciliation.id)}
                          >
                            处理
                          </button>
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

export default Reconciliation;
