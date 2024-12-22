import { format } from 'date-fns';

// Mock merchant data
export const merchants = [
  {
    id: 'M001',
    name: '测试商户1',
    balance: 10000.00,
    status: '正常',
    registerTime: '2024-01-15 10:30:00',
  },
  {
    id: 'M002',
    name: '测试商户2',
    balance: 25000.00,
    status: '正常',
    registerTime: '2024-01-16 14:20:00',
  },
  {
    id: 'M003',
    name: '测试商户3',
    balance: 5000.00,
    status: '待审核',
    registerTime: '2024-01-17 09:15:00',
  },
];

// Mock order data
export const orders = [
  {
    id: 'O001',
    merchantId: 'M001',
    amount: 1000.00,
    status: '成功',
    createTime: '2024-01-17 15:30:00',
  },
  {
    id: 'O002',
    merchantId: 'M002',
    amount: 2500.00,
    status: '处理中',
    createTime: '2024-01-17 16:45:00',
  },
  {
    id: 'O003',
    merchantId: 'M001',
    amount: 1500.00,
    status: '失败',
    createTime: '2024-01-17 17:20:00',
  },
];

// Mock transaction data
export const transactions = [
  {
    id: 'T001',
    merchantId: 'M001',
    amount: 1000.00,
    type: '收入',
    status: '成功',
    createTime: '2024-01-17 15:30:00',
  },
  {
    id: 'T002',
    merchantId: 'M002',
    amount: 2500.00,
    type: '支出',
    status: '成功',
    createTime: '2024-01-17 16:45:00',
  },
];

// Mock bank account data
export const bankAccounts = [
  {
    id: 'B001',
    merchantId: 'M001',
    accountName: '测试账户1',
    bankName: '中国银行',
    accountNumber: '6225********1234',
    status: '正常',
  },
  {
    id: 'B002',
    merchantId: 'M002',
    accountName: '测试账户2',
    bankName: '工商银行',
    accountNumber: '6222********5678',
    status: '正常',
  },
];

// Mock statistics data
export const statistics = {
  today: {
    orderCount: 656,
    orderAmount: 78050,
    successRate: 17.75,
  },
  yesterday: {
    orderCount: 8074,
    orderAmount: 516900,
    successRate: 32.22,
  },
  platform: {
    agentCount: 1,
    merchantCount: 38,
    totalOrders: 145855,
    totalAmount: 8753800,
    profit: 112374.5,
  },
};

// Helper function to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
};

// Helper function to format date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};
