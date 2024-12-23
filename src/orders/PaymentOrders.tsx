import { ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Row, Select, Space, Statistic, Table } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { PaymentOrder, generatePaymentOrderData } from '../data/systemMockData';
import '../styles/table.css';

const PaymentOrders: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaymentOrder[]>([]);

  const fetchData = useCallback(() => {
    setLoading(true);
    // Simulate API call with mock data
    const newData = generatePaymentOrderData(10).map(
      (item: any, index: number): PaymentOrder => ({
        key: `${index + 1}`,
        merchantId: `M${index + 1}`,
        merchantName: item.merchantName || `商户${index + 1}`,
        merchantOrderNo: item.merchantOrderNo || `MO${index + 1}`,
        merchantChannel: item.merchantChannel || '支付宝',
        product: item.product || '支付宝扫码',
        payOrderId: item.payOrderId || `P${index + 1}`,
        amount: item.amount || 100.0,
        floatAmount: item.floatAmount || 0.0,
        status: item.status || '成功',
        createdAt: item.createdAt || new Date().toLocaleString(),
        channelCallbackTime: item.channelCallbackTime || '-',
        duration: item.duration || 0,
      }),
    );
    setData(newData);
    setLoading(false);
  }, []);

  // Auto refresh every 90 seconds
  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 90000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const stats = {
    submittedOrders: 4151,
    totalAmount: 639600,
    paidOrders: 916,
    paidAmount: 108200,
    merchantIncome: 96298,
    agentIncome: 0,
    platformIncome: 1082,
    unpaidOrders: 3235,
    unpaidAmount: 531400,
    nextDayCallbackOrders: 15,
    nextDayCallbackAmount: 900,
    nextDayMerchantIncome: 801,
    nextDayAgentIncome: 0,
    nextDayPlatformIncome: 9,
  };
  const columns = [
    { title: '商户号', dataIndex: 'merchantId', key: 'merchantId' },
    { title: '商户名称', dataIndex: 'merchantName', key: 'merchantName' },
    { title: '商户单号', dataIndex: 'merchantOrderNo', key: 'merchantOrderNo' },
    { title: '商戶 / 通道', dataIndex: 'merchantChannel', key: 'merchantChannel' },
    { title: '支付产品', dataIndex: 'product', key: 'product' },
    { title: '支付单号', dataIndex: 'payOrderId', key: 'payOrderId' },
    { title: '支付金额', dataIndex: 'amount', key: 'amount' },
    { title: '浮动金额', dataIndex: 'floatAmount', key: 'floatAmount' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '渠道回调时间', dataIndex: 'channelCallbackTime', key: 'channelCallbackTime' },
    { title: '耗时(秒)', dataIndex: 'duration', key: 'duration' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" style={{ color: '#009688', padding: 0 }}>
            查看
          </Button>
          <Button type="link" style={{ color: '#009688', padding: 0 }}>
            手动补单
          </Button>
        </Space>
      ),
    },
  ];

  // Data is now managed by state

  return (
    <div className="p-6">
      {/* Order Statistics */}
      <Card title="订单统计" className="mb-4" loading={loading}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Statistic title="提交订单数" value={stats.submittedOrders} />
          </Col>
          <Col span={6}>
            <Statistic title="订单总金额" value={stats.totalAmount} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="已付订单数" value={stats.paidOrders} />
          </Col>
          <Col span={6}>
            <Statistic title="已付总金额" value={stats.paidAmount} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="商户总收入" value={stats.merchantIncome} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="代理商收入" value={stats.agentIncome} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="平台收入" value={stats.platformIncome} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="未付订单数" value={stats.unpaidOrders} />
          </Col>
          <Col span={6}>
            <Statistic title="未付总金额" value={stats.unpaidAmount} prefix="¥" />
          </Col>
        </Row>
      </Card>

      {/* Next Day Callback Statistics */}
      <Card title="隔日回调统计" className="mb-4" loading={loading}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Statistic title="隔日回调订单数" value={stats.nextDayCallbackOrders} />
          </Col>
          <Col span={6}>
            <Statistic title="隔日回调总金额" value={stats.nextDayCallbackAmount} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="商户总收入" value={stats.nextDayMerchantIncome} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="代理商收入" value={stats.nextDayAgentIncome} prefix="¥" />
          </Col>
          <Col span={6}>
            <Statistic title="平台收入" value={stats.nextDayPlatformIncome} prefix="¥" />
          </Col>
        </Row>
      </Card>

      <Card
        title="支付订单"
        extra={
          <Space size="middle" wrap>
            <DatePicker placeholder="开始时间" />
            <DatePicker placeholder="结束时间" />
            <Input placeholder="商户ID" style={{ width: 120 }} />
            <Input placeholder="支付订单号" style={{ width: 150 }} />
            <Input placeholder="商户订单号" style={{ width: 150 }} />
            <Input placeholder="最小金额" style={{ width: 100 }} />
            <Input placeholder="最大金额" style={{ width: 100 }} />
            <Select
              placeholder="支付通道"
              style={{ width: 120 }}
              options={[
                { value: 'alipay', label: '支付宝' },
                { value: 'wxpay', label: '微信支付' },
                { value: 'usdt', label: 'USDT' },
                { value: 'unionpay', label: '银联支付' },
              ]}
            />
            <Select
              placeholder="支付产品"
              style={{ width: 120 }}
              options={[
                { value: 'alipay_scan', label: '支付宝扫码' },
                { value: 'wxpay_h5', label: '微信H5' },
                { value: 'usdt_trc20', label: 'USDT-TRC20' },
                { value: 'unionpay_quick', label: '银联快捷' },
              ]}
            />
            <Select
              placeholder="订单状态"
              style={{ width: 120 }}
              options={[
                { value: 'success', label: '成功' },
                { value: 'failed', label: '失败' },
                { value: 'pending', label: '处理中' },
              ]}
            />
            <Button type="primary" style={{ backgroundColor: '#009688' }}>
              搜索
            </Button>
            <Button type="primary" style={{ backgroundColor: '#009688' }}>
              导出
            </Button>
            <Button type="primary" style={{ backgroundColor: '#009688' }}>
              搜索隔日回调
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchData}
              loading={loading}
              style={{ backgroundColor: '#009688', color: 'white' }}
            >
              手动刷新
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          className="custom-table"
          pagination={{
            total: 100,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            pageSizeOptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],
            size: 'default',
            position: ['bottomRight'],
            className: 'custom-pagination',
            locale: {
              items_per_page: '条/页',
              jump_to: '跳至',
              jump_to_confirm: '确定',
              page: '页',
            },
            onChange: (page, pageSize) => {
              setLoading(true);
              // Simulate API call with mock data for specific page
              setTimeout(() => {
                const newData = generatePaymentOrderData(pageSize).map(
                  (item: any, index: number): PaymentOrder => ({
                    key: `${(page - 1) * pageSize + index + 1}`,
                    merchantId: `M${(page - 1) * pageSize + index + 1}`,
                    merchantName: item.merchantName || `商户${(page - 1) * pageSize + index + 1}`,
                    merchantOrderNo:
                      item.merchantOrderNo || `MO${(page - 1) * pageSize + index + 1}`,
                    merchantChannel: item.merchantChannel || '支付宝',
                    product: item.product || '支付宝扫码',
                    payOrderId: item.payOrderId || `P${(page - 1) * pageSize + index + 1}`,
                    amount: item.amount || 100.0,
                    floatAmount: item.floatAmount || 0.0,
                    status: item.status || '成功',
                    createdAt: item.createdAt || new Date().toLocaleString(),
                    channelCallbackTime: item.channelCallbackTime || '-',
                    duration: item.duration || 0,
                  }),
                );
                setData(newData);
                setLoading(false);
              }, 500); // Add slight delay to show loading state
            },
          }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default PaymentOrders;
