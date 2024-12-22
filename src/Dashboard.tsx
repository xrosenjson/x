import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = {
  today: {
    orders: 1732,
    amount: 146200,
    successRate: 22.21
  },
  yesterday: {
    orders: 8074,
    amount: 516900,
    successRate: 32.22
  },
  platform: {
    agents: 1,
    merchants: 38,
    totalOrders: 146931,
    totalAmount: 8821950,
    profit: 113056,
    paymentProfit: 113056
  },
  weeklyData: [
    { date: '周一', amount: 82850 },
    { date: '周二', amount: 85000 },
    { date: '周三', amount: 78000 },
    { date: '周四', amount: 92000 },
    { date: '周五', amount: 88000 },
    { date: '周六', amount: 90000 },
    { date: '周日', amount: 95000 }
  ]
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 p-4 bg-[#f3f3f4]">
      <h2 className="text-base font-medium text-text-DEFAULT">今/昨日订单</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow hover:shadow-md transition-shadow">
          <h3 className="text-sm text-text-light">今日收款订单</h3>
          <p className="text-2xl font-medium text-primary-DEFAULT mt-2">
            <span className="text-[24px]">{mockData.today.orders}</span>
            <span className="text-sm text-text-light ml-1">个</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">今日收款总额</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.today.amount}</span>
            <span className="text-sm text-text-light ml-1">元</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">昨日收款订单</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.yesterday.orders}</span>
            <span className="text-sm text-text-light ml-1">个</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">昨日收款总额</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.yesterday.amount}</span>
            <span className="text-sm text-text-light ml-1">元</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">今日成功率</h3>
          <p className="text-xl font-medium text-[#009688] mt-2">{mockData.today.successRate}%（{mockData.today.successRate}%）</p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">昨日成功率</h3>
          <p className="text-xl font-medium text-[#009688] mt-2">{mockData.yesterday.successRate}%（{mockData.yesterday.successRate}%）</p>
        </div>
      </div>

      <div className="bg-card-DEFAULT p-4 rounded-sm shadow hover:shadow-md transition-shadow">
        <h2 className="text-base font-medium text-text-DEFAULT mb-4">近七日平台交易金额</h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="date" 
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                dy={8}
              />
              <YAxis  
                axisLine={{ stroke: '#e5e5e5' }}
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount"
                stroke="#009688"
                strokeWidth={2}
                dot={{ fill: '#009688', r: 3 }}
                activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4">平台</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">代理商总数</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.platform.agents}</span>
            <span className="text-sm text-text-light ml-1">个</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">商户总数</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.platform.merchants}</span>
            <span className="text-sm text-text-light ml-1">个</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">收款订单</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.platform.totalOrders}</span>
            <span className="text-sm text-text-light ml-1">个</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">收款总额</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.platform.totalAmount}</span>
            <span className="text-sm text-text-light ml-1">元</span>
          </p>
        </div>
        <div className="bg-card-DEFAULT p-4 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
          <h3 className="text-sm text-text-light">总利润</h3>
          <p className="text-2xl font-medium text-[#009688] mt-2">
            <span className="text-[24px]">{mockData.platform.profit}</span>
            <span className="text-sm text-text-light ml-1">元</span>
          </p>
        </div>
        <div className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow">
          <h3 className="text-sm text-text-light">收款利润</h3>
          <p className="text-2xl font-medium text-primary mt-3">
            <span className="text-[28px]">{mockData.platform.paymentProfit}</span>
            <span className="text-sm text-text-light ml-1">元</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
