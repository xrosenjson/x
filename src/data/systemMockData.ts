import { faker } from '@faker-js/faker';
faker.setLocale('zh_CN');

export interface PaymentOrder {
  key: string;
  merchantId: string;
  merchantName: string;
  merchantOrderNo: string;
  merchantChannel: string;
  product: string;
  payOrderId: string;
  amount: number;
  floatAmount: number;
  status: string;
  createdAt: string;
  channelCallbackTime: string;
  duration: number;
}

const paymentChannels = ['支付宝', '微信支付', 'USDT', '银联支付'];
const paymentProducts = ['支付宝扫码', '微信H5', 'USDT-TRC20', '银联快捷'];
const orderStatuses = ['成功', '失败', '处理中'];

export const generatePaymentOrderData = (count: number): PaymentOrder[] => {
  return Array.from({ length: count }, (_, index) => ({
    key: `${index + 1}`,
    merchantId: `M${faker.number.int({ min: 1000, max: 9999 })}`,
    merchantName: `商户${faker.number.int({ min: 100, max: 999 })}`,
    merchantOrderNo: `MO${faker.number.int({ min: 10000, max: 99999 })}`,
    merchantChannel: faker.helpers.arrayElement(paymentChannels),
    product: faker.helpers.arrayElement(paymentProducts),
    payOrderId: `P${faker.number.int({ min: 100000, max: 999999 })}`,
    amount: parseFloat(faker.finance.amount(100, 10000, 2)),
    floatAmount: parseFloat(faker.finance.amount(0, 10, 2)),
    status: faker.helpers.arrayElement(orderStatuses),
    createdAt: faker.date.recent().toLocaleString(),
    channelCallbackTime: faker.date.recent().toLocaleString(),
    duration: faker.number.int({ min: 0, max: 60 })
  }));
};
