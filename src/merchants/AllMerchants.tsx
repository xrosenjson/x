import React from 'react';

const AllMerchants: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [status, setStatus] = React.useState('启用');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [goToPage, setGoToPage] = React.useState('1');
  const [merchants, setMerchants] = React.useState([
    {
      id: '10039',
      name: '星光',
      status: '启用',
      category: '开机组',
      balance: 1958.00,
      agentId: '',
      agentName: '',
    },
    {
      id: '10038',
      name: '合家',
      status: '启用',
      category: '开机组',
      balance: 1474555.75,
      agentId: '',
      agentName: '',
    },
    {
      id: '10036',
      name: '八戒',
      status: '启用',
      category: '开机组',
      balance: 3679629.25,
      agentId: '',
      agentName: '',
    },
    {
      id: '10035',
      name: 'test',
      status: '启用',
      category: '',
      balance: 0,
      agentId: '',
      agentName: '',
    },
    {
      id: '10033',
      name: '格莱美',
      status: '启用',
      category: '开机组',
      balance: 8809178.25,
      agentId: '',
      agentName: '',
    },
    {
      id: '10032',
      name: '恒大',
      status: '启用',
      category: '',
      balance: 0,
      agentId: '',
      agentName: '',
    },
    {
      id: '10031',
      name: '兔兔',
      status: '启用',
      category: '',
      balance: 0,
      agentId: '',
      agentName: '',
    },
    {
      id: '10030',
      name: '糖宝支付',
      status: '启用',
      category: '',
      balance: 363885,
      agentId: '',
      agentName: '',
    },
    {
      id: '10029',
      name: '小青',
      status: '启用',
      category: '',
      balance: 313616,
      agentId: '',
      agentName: '',
    },
    {
      id: '10028',
      name: '茶楼',
      status: '启用',
      category: '开机组',
      balance: 4678578.75,
      agentId: '',
      agentName: '',
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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded shadow-sm">
        <div className="px-6 py-3 border-b border-[#e8e8e8] flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-800">所有商户</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Top action buttons */}
            <div className="flex items-center space-x-2 mb-4">
              <button className="px-3 py-1.5 text-xs bg-[#009688] text-white rounded-sm hover:bg-[#00877a] transition-colors">
                新增
              </button>
              <button className="px-3 py-1.5 text-xs bg-[#009688] text-white rounded-sm hover:bg-[#00877a] transition-colors">
                配置通道
              </button>
              <button className="px-3 py-1.5 text-xs bg-[#009688] text-white rounded-sm hover:bg-[#00877a] transition-colors">
                一键清零
              </button>
            </div>

            {/* Search filters */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="商户ID"
                  className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:border-[#009688] focus:outline-none transition-colors w-32"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="商户部份名称"
                  className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:border-[#009688] focus:outline-none transition-colors w-32"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:border-[#009688] focus:outline-none transition-colors w-24"
                >
                  <option value="启用">启用</option>
                  <option value="禁用">禁用</option>
                  <option value="全部">全部</option>
                </select>
                <button 
                  className="px-3 py-1.5 text-xs bg-[#009688] text-white rounded-sm hover:bg-[#00877a] transition-colors"
                  onClick={handleSearch}
                >
                  搜索
                </button>
              </div>
            </div>

            {/* Merchants table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e8e8e8]">
                <thead>
                  <tr className="bg-[#f2f2f2]">
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      商户ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      商户名称
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      状态
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      分类
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      账户余额
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      代理商ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      代理商名称
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-normal text-gray-600 border-b border-[#e8e8e8]">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#e8e8e8]">
                  {merchants.map((merchant) => (
                    <tr key={merchant.id} className="hover:bg-[#f9f9f9]">
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.id}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs">
                        <span className={merchant.status === '启用' ? 'text-[#009688]' : 'text-red-500'}>
                          {merchant.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.category}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.balance.toLocaleString('zh-CN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.agentId}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                        {merchant.agentName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs">
                        <div className="flex items-center text-xs">
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">登录系统</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">收银台</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">结算设置</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">支付通道</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">代付通道</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">余额变更</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">清空余额</a>
                          <span className="mx-1 text-gray-300">|</span>
                          <a href="#" className="text-[#009688] hover:text-[#00877a] transition-colors">编辑</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">共 38 条</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-sm focus:border-[#009688] focus:outline-none"
                  >
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((n) => (
                      <option key={n} value={n}>{n} 条/页</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    className="px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688] disabled:opacity-50"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    首页
                  </button>
                  <button
                    className="px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688] disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    上一页
                  </button>
                  {Array.from({ length: Math.min(4, Math.ceil(merchants.length / itemsPerPage)) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688] ${
                        currentPage === i + 1 ? 'text-[#009688]' : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688] disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= merchants.length}
                  >
                    下一页
                  </button>
                  <button
                    className="px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688] disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.ceil(merchants.length / itemsPerPage))}
                    disabled={currentPage === Math.ceil(merchants.length / itemsPerPage)}
                  >
                    尾页
                  </button>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-600">到第</span>
                    <input
                      type="text"
                      min="1"
                      max={Math.ceil(merchants.length / itemsPerPage)}
                      value={goToPage}
                      onChange={(e) => setGoToPage(e.target.value)}
                      className="w-12 px-2 py-1 text-xs border border-gray-300 rounded-sm focus:border-[#009688] focus:outline-none"
                    />
                    <span className="text-xs text-gray-600">页</span>
                    <button
                      onClick={() => {
                        const page = parseInt(goToPage);
                        if (page >= 1 && page <= Math.ceil(merchants.length / itemsPerPage)) {
                          setCurrentPage(page);
                        }
                      }}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-sm hover:text-[#009688]"
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMerchants;
