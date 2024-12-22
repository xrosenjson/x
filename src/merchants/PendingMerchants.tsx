import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';

const PendingMerchants: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [merchants, setMerchants] = React.useState([
    {
      id: 'M003',
      name: '测试商户3',
      applyTime: '2024-01-17 09:15:00',
      status: '待审核',
    },
    {
      id: 'M004',
      name: '测试商户4',
      applyTime: '2024-01-17 10:20:00',
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

  const handleApprove = (merchantId: string) => {
    // Implement approval logic
    console.log('Approve merchant:', merchantId);
  };

  const handleReject = (merchantId: string) => {
    // Implement rejection logic
    console.log('Reject merchant:', merchantId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">待审商户</h2>
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
              <button 
                className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877A]"
                onClick={handleSearch}
              >
                搜索
              </button>
            </div>

            {/* Pending merchants table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      申请时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {merchants.map((merchant) => (
                    <tr key={merchant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {merchant.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {merchant.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {merchant.applyTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          {merchant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button 
                          className="text-green-600 hover:text-green-700 mr-2"
                          onClick={() => handleApprove(merchant.id)}
                        >
                          通过
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(merchant.id)}
                        >
                          拒绝
                        </button>
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

export default PendingMerchants;
