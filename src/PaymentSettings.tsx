import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';

const PaymentSettings: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [channels, setChannels] = React.useState([
    {
      id: 'PC001',
      name: '支付宝',
      code: 'ALIPAY',
      merchantId: 'PID2024011500001',
      merchantKey: '************1234',
      minAmount: 1.00,
      maxAmount: 50000.00,
      fee: 0.006,
      status: '正常',
      createTime: '2024-01-15 10:00:00',
    },
    {
      id: 'PC002',
      name: '微信支付',
      code: 'WECHAT',
      merchantId: 'WID2024011500002',
      merchantKey: '************5678',
      minAmount: 0.01,
      maxAmount: 100000.00,
      fee: 0.006,
      status: '正常',
      createTime: '2024-01-15 11:00:00',
    },
  ]);

  const handleSearch = () => {
    const filteredChannels = channels.filter(channel => {
      const matchId = !searchId || channel.id.toLowerCase().includes(searchId.toLowerCase());
      const matchName = !searchName || channel.name.toLowerCase().includes(searchName.toLowerCase());
      return matchId && matchName;
    });
    setChannels(filteredChannels);
  };

  const handleEdit = (channelId: string) => {
    // Implement edit logic
    console.log('Edit channel:', channelId);
  };

  const handleDelete = (channelId: string) => {
    // Implement deletion logic
    console.log('Delete channel:', channelId);
  };

  const handleToggleStatus = (channelId: string) => {
    // Implement status toggle logic
    console.log('Toggle status for channel:', channelId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">支付配置</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search filters */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="通道ID"
                className="px-3 py-2 border rounded-md"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <input
                type="text"
                placeholder="通道名称"
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
              <button 
                className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877A]"
                onClick={() => console.log('Add new channel')}
              >
                添加通道
              </button>
            </div>

            {/* Payment channels table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      通道ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      通道名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      通道代码
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商户密钥
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最小金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最大金额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手续费率
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
                  {channels.map((channel) => (
                    <tr key={channel.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.merchantId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.merchantKey}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{channel.minAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{channel.maxAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(channel.fee * 100).toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {channel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {channel.createTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleEdit(channel.id)}
                        >
                          编辑
                        </button>
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleToggleStatus(channel.id)}
                        >
                          启用/禁用
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(channel.id)}
                        >
                          删除
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

export default PaymentSettings;
