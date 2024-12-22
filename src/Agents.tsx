import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';

const Agents: React.FC = () => {
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');
  const [agents, setAgents] = React.useState([
    {
      id: 'A001',
      name: '代理商1',
      contactPerson: '王五',
      phone: '13800138000',
      email: 'agent1@example.com',
      balance: 50000.00,
      commission: 0.1,
      status: '正常',
      createTime: '2024-01-15 10:00:00',
    },
    {
      id: 'A002',
      name: '代理商2',
      contactPerson: '赵六',
      phone: '13900139000',
      email: 'agent2@example.com',
      balance: 75000.00,
      commission: 0.12,
      status: '正常',
      createTime: '2024-01-16 11:00:00',
    },
  ]);

  const handleSearch = () => {
    const filteredAgents = agents.filter(agent => {
      const matchId = !searchId || agent.id.toLowerCase().includes(searchId.toLowerCase());
      const matchName = !searchName || agent.name.toLowerCase().includes(searchName.toLowerCase());
      return matchId && matchName;
    });
    setAgents(filteredAgents);
  };

  const handleEdit = (agentId: string) => {
    // Implement edit logic
    console.log('Edit agent:', agentId);
  };

  const handleDelete = (agentId: string) => {
    // Implement deletion logic
    console.log('Delete agent:', agentId);
  };

  const handleAdjustBalance = (agentId: string) => {
    // Implement balance adjustment logic
    console.log('Adjust balance for agent:', agentId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">代理商管理</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search filters */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="代理商ID"
                className="px-3 py-2 border rounded-md"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <input
                type="text"
                placeholder="代理商名称"
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
                onClick={() => console.log('Add new agent')}
              >
                添加代理商
              </button>
            </div>

            {/* Agents table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      代理商ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      代理商名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      联系人
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      联系电话
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      邮箱
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      余额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      分润比例
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
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.contactPerson}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{agent.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agent.commission * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.createTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleEdit(agent.id)}
                        >
                          编辑
                        </button>
                        <button 
                          className="text-[#009688] hover:text-[#00877A] mr-2"
                          onClick={() => handleAdjustBalance(agent.id)}
                        >
                          调整余额
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(agent.id)}
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

export default Agents;
