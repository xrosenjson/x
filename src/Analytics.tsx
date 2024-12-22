import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = React.useState('7');
  const [transactionData] = React.useState([
    { date: '01-15', amount: 78050, count: 656, successRate: 17.75 },
    { date: '01-16', amount: 82100, count: 702, successRate: 19.20 },
    { date: '01-17', amount: 75300, count: 589, successRate: 18.50 },
    { date: '01-18', amount: 89200, count: 745, successRate: 20.10 },
    { date: '01-19', amount: 92500, count: 812, successRate: 21.30 },
    { date: '01-20', amount: 85700, count: 698, successRate: 19.80 },
    { date: '01-21', amount: 79800, count: 678, successRate: 18.90 },
  ]);

  const [statistics] = React.useState({
    today: {
      orderCount: 656,
      amount: 78050,
      successRate: 17.75,
    },
    yesterday: {
      orderCount: 8074,
      amount: 516900,
      successRate: 32.22,
    },
    platform: {
      agentCount: 1,
      merchantCount: 38,
      totalOrders: 145855,
      totalAmount: 8753800,
      totalProfit: 112374.5,
    },
  });

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">今日数据</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">订单数</span>
                <span className="text-lg font-semibold">{statistics.today.orderCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">交易金额</span>
                <span className="text-lg font-semibold">¥{statistics.today.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成功率</span>
                <span className="text-lg font-semibold">{statistics.today.successRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">昨日数据</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">订单数</span>
                <span className="text-lg font-semibold">{statistics.yesterday.orderCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">交易金额</span>
                <span className="text-lg font-semibold">¥{statistics.yesterday.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成功率</span>
                <span className="text-lg font-semibold">{statistics.yesterday.successRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">平台概况</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">代理商数</span>
                <span className="text-lg font-semibold">{statistics.platform.agentCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">商户数</span>
                <span className="text-lg font-semibold">{statistics.platform.merchantCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总订单数</span>
                <span className="text-lg font-semibold">{statistics.platform.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总金额</span>
                <span className="text-lg font-semibold">¥{statistics.platform.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总利润</span>
                <span className="text-lg font-semibold">¥{statistics.platform.totalProfit.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">交易趋势</h3>
            <select
              className="px-3 py-2 border rounded-md"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7">最近7天</option>
              <option value="30">最近30天</option>
              <option value="90">最近90天</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="amount"
                  stroke="#009688"
                  name="交易金额"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="count"
                  stroke="#2196F3"
                  name="订单数"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
