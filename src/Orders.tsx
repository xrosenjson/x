import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

// Define OrderContent component first to avoid usage before declaration
const OrderContent: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'payment':
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">支付订单列表</h3>
          {/* Payment orders specific content */}
        </div>
      );
    case 'notify':
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">回调记录列表</h3>
          {/* Callback records specific content */}
        </div>
      );
    case 'reissue':
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">补单记录列表</h3>
          {/* Reissue records specific content */}
        </div>
      );
    case 'export':
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">转换与导出</h3>
          {/* Export specific content */}
        </div>
      );
    default:
      return null;
  }
};

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  const location = useLocation();
  const { type = 'payment' } = useParams();
  const [searchOrderId, setSearchOrderId] = React.useState('');
  const [searchMerchantId, setSearchMerchantId] = React.useState('');

  const orderTypes = [
    { type: 'payment', label: '支付订单', path: '/orders/payment' },
    { type: 'notify', label: '回调记录', path: '/orders/notify' },
    { type: 'reissue', label: '补单记录', path: '/orders/reissue' },
    { type: 'export', label: '转换与导出', path: '/orders/export' }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded shadow-sm">
        <div className="px-6 py-3 border-b border-[#e8e8e8] flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-800">订单管理</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Order type tabs */}
            <div className="flex border-b border-[#e8e8e8]">
              {orderTypes.map((orderType) => (
                <Link
                  key={orderType.type}
                  to={orderType.path}
                  className={`px-4 py-2 text-sm transition-colors ${
                    location.pathname === orderType.path
                      ? 'text-[#009688] border-b-2 border-[#009688]'
                      : 'text-gray-600 hover:text-[#009688]'
                  }`}
                >
                  {orderType.label}
                </Link>
              ))}
            </div>

            {/* Search filters */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="订单号"
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:border-[#009688] focus:outline-none transition-colors"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
              />
              <input
                type="text"
                placeholder="商户ID"
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:border-[#009688] focus:outline-none transition-colors"
                value={searchMerchantId}
                onChange={(e) => setSearchMerchantId(e.target.value)}
              />
              <button 
                className="px-4 py-1.5 text-xs bg-[#009688] text-white rounded-sm hover:bg-[#00877a] transition-colors"
              >
                搜索
              </button>
            </div>

            {/* Orders table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e8e8e8]">
                <thead className="bg-[#f5f5f5]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">订单号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">商户ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">金额</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">创建时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#e8e8e8]">
                  {/* Order rows will be populated here */}
                </tbody>
              </table>
            </div>

            {/* Type-specific content */}
            <OrderContent type={type} />
          </div>
        </div>
      </div>
    </div>
  );

};

export default Orders;
