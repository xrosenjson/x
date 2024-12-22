import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';

const BankAccounts: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [accounts, setAccounts] = React.useState([
    {
      id: 'BA001',
      merchantId: 'M001',
      merchantName: '测试商户1',
      bankName: '中国工商银行',
      accountNumber: '6222021234567890123',
      accountName: '张三',
      status: '正常',
    },
    {
      id: 'BA002',
      merchantId: 'M002',
      merchantName: '测试商户2',
      bankName: '中国建设银行',
      accountNumber: '6227001234567890123',
      accountName: '李四',
      status: '正常',
    },
  ]);

  const handleSearch = () => {
    const filteredAccounts = accounts.filter(account => {
      const matchId = !searchId || account.merchantId.toLowerCase().includes(searchId.toLowerCase());
      const matchName = !searchName || account.merchantName.toLowerCase().includes(searchName.toLowerCase());
      return matchId && matchName;
    });
    setAccounts(filteredAccounts);
  };

  const handleVerify = (accountId: string) => {
    // Implement verification logic
    console.log('Verify account:', accountId);
  };

  const handleDelete = (accountId: string) => {
    // Implement deletion logic
    console.log('Delete account:', accountId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">银行账号</h2>
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

            {/* Bank accounts table */}
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
                      开户行
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      银行账号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      开户名
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
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.merchantId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.merchantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.bankName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.accountName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleVerify(account.id)}
                        >
                          验证
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(account.id)}
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

export default BankAccounts;
