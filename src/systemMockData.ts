import { faker } from '@faker-js/faker/locale/zh_CN';

// Generate mock data for Payment Configuration
export const generatePaymentChannelData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    channelId: faker.string.numeric(6),
    channelName: faker.helpers.arrayElement(['支付宝', '微信支付', 'USDT', '银联支付']),
    identifier: faker.helpers.arrayElement(['alipay', 'wxpay', 'usdt', 'unionpay']),
    status: faker.helpers.arrayElement(['启用', '禁用']),
    rate: faker.number.float({ min: 0.001, max: 0.01, fractionDigits: 3 }),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

export const generateChannelIdentifierData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    identifierId: faker.string.numeric(6),
    identifierName: faker.helpers.arrayElement(['alipay', 'wxpay', 'usdt', 'unionpay']),
    status: faker.helpers.arrayElement(['启用', '禁用']),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

export const generatePaymentProductData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    productId: faker.string.numeric(6),
    productName: faker.helpers.arrayElement(['支付宝扫码', '微信H5', 'USDT-TRC20', '银联快捷']),
    channel: faker.helpers.arrayElement(['支付宝', '微信支付', 'USDT', '银联支付']),
    status: faker.helpers.arrayElement(['启用', '禁用']),
    rate: faker.number.float({ min: 0.001, max: 0.01, fractionDigits: 3 }),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

export const generateWeightData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    channelId: faker.string.numeric(6),
    channelName: faker.helpers.arrayElement(['支付宝', '微信支付', 'USDT', '银联支付']),
    currentWeight: faker.number.int({ min: 1, max: 100 }),
    minWeight: faker.number.int({ min: 1, max: 50 }),
    maxWeight: faker.number.int({ min: 51, max: 100 }),
    updatedAt: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for Orders
export const generatePaymentOrderData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    amount: faker.number.int({ min: 100, max: 10000 }),
    channel: faker.helpers.arrayElement(['支付宝', '微信支付', 'USDT']),
    status: faker.helpers.arrayElement(['成功', '失败', '处理中']),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

export const generateCallbackData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    status: faker.helpers.arrayElement(['成功', '失败']),
    count: faker.number.int({ min: 1, max: 5 }),
    lastTime: faker.date.recent().toLocaleString(),
  }));
};

export const generateReissueData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    status: faker.helpers.arrayElement(['成功', '失败']),
    reissueTime: faker.date.recent().toLocaleString(),
    operator: faker.internet.userName(),
  }));
};

export const generateExportData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    fileName: `订单导出_${faker.date.recent().toLocaleDateString()}.xlsx`,
    exportTime: faker.date.recent().toLocaleString(),
    status: faker.helpers.arrayElement(['完成', '处理中']),
  }));
};

// Generate mock data for SystemQuota
export const generateSystemQuotaData = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.numeric(6),
    amount: faker.number.int({ min: 1000, max: 100000 }),
    usdt: faker.number.float({ min: 100, max: 10000, fractionDigits: 2 }),
    usdtRate: faker.number.float({ min: 6.5, max: 7.5, fractionDigits: 4 }),
    remarks: faker.lorem.words(3),
    pointsBefore: faker.number.int({ min: 0, max: 10000 }),
    pointsAfter: faker.number.int({ min: 0, max: 10000 }),
    accountId: faker.string.numeric(8),
    accountName: faker.person.fullName(),
    ip: faker.internet.ip(),
    time: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for OperationLog
export const generateOperationLogData = (count: number) => {
  return Array.from({ length: count }, () => ({
    userId: faker.string.numeric(6),
    username: faker.internet.userName(),
    userIp: faker.internet.ip(),
    system: faker.helpers.arrayElement(['前台', '后台', 'API']),
    description: faker.lorem.sentence(),
    method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
    requestParams: JSON.stringify(faker.helpers.objectEntry({ key: 'value' })),
    responseResult: JSON.stringify({ status: 'success', data: faker.helpers.objectEntry({ key: 'value' }) }),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for User Management
export const generateUserData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(4),
    userId: faker.string.numeric(4),
    username: faker.internet.userName(),
    role: faker.helpers.arrayElement(['管理员', '商户', '代理商']),
    status: faker.helpers.arrayElement(['正常', '禁用']),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for Role Management
export const generateRoleData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(3),
    roleId: faker.string.numeric(3),
    roleName: faker.helpers.arrayElement(['超级管理员', '系统管理员', '商户管理员', '财务管理员']),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for Resource Management
export const generateResourceData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(4),
    resourceId: faker.string.numeric(4),
    resourceName: faker.helpers.arrayElement(['用户管理', '角色管理', '订单管理', '支付配置']),
    resourceType: faker.helpers.arrayElement(['菜单', '按钮', '接口']),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

// Generate mock data for Message Management
export const generateMessageData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(6),
    messageId: faker.string.numeric(6),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    sendTime: faker.date.recent().toLocaleString(),
    status: faker.helpers.arrayElement(['已读', '未读']),
  }));
};

// Generate mock data for Payout Orders
export const generatePayoutOrderData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    amount: faker.number.int({ min: 1000, max: 100000 }),
    fee: faker.number.int({ min: 10, max: 1000 }),
    status: faker.helpers.arrayElement(['成功', '失败', '处理中']),
    createdAt: faker.date.recent().toLocaleString(),
  }));
};

export const generatePayoutCallbackData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    status: faker.helpers.arrayElement(['成功', '失败']),
    count: faker.number.int({ min: 1, max: 5 }),
    lastTime: faker.date.recent().toLocaleString(),
  }));
};

export const generatePayoutReissueData = (count: number) => {
  return Array.from({ length: count }, () => ({
    key: faker.string.numeric(8),
    orderId: faker.string.numeric(12),
    merchantId: faker.string.numeric(6),
    status: faker.helpers.arrayElement(['成功', '失败']),
    reissueTime: faker.date.recent().toLocaleString(),
    operator: faker.internet.userName(),
  }));
};
