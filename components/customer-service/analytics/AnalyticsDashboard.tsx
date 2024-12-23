import React, { useState, useEffect, useCallback } from 'react';
import { Card, DatePicker, Select, Row, Col, Statistic, Space, Spin, Typography } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Dayjs } from 'dayjs';
import {
  AnalyticsResponse,
  DashboardFilters,
  AnalyticsDashboardProps
} from './types';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  className,
  onFilterChange,
  loading = false
}) => {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: null,
    channel: 'all',
    groupBy: 'day'
  });
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: filters.dateRange?.[0]?.format('YYYY-MM-DD'),
          endDate: filters.dateRange?.[1]?.format('YYYY-MM-DD'),
          channel: filters.channel === 'all' ? undefined : filters.channel,
          groupBy: filters.groupBy,
        }),
      });

      if (!response.ok) {
        throw new Error('获取数据失败');
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('获取分析数据失败:', error);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
    onFilterChange?.(filters);
  }, [filters, fetchAnalytics, onFilterChange]);

  const handleDateRangeChange = (
    dates: RangePickerProps['value'],
    _dateStrings: [string, string]
  ) => {
    setFilters(prev => ({ ...prev, dateRange: dates as [Dayjs, Dayjs] | null }));
  };

  const handleChannelChange = (channel: string) => {
    setFilters(prev => ({ ...prev, channel }));
  };

  const handleGroupByChange = (groupBy: 'day' | 'week' | 'month') => {
    setFilters(prev => ({ ...prev, groupBy }));
  };

  const formatChannelName = (channel: string): string => {
    const channelMap: Record<string, string> = {
      'wechat': '微信公众号',
      'workWechat': '企业微信',
      'dingtalk': '钉钉',
      'all': '全部渠道'
    };
    return channelMap[channel] || channel;
  };

  return (
    <div className={className}>
      <Spin spinning={loading}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Title and Filters */}
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={4}>数据分析面板</Title>
              <Space wrap style={{ marginBottom: 24 }}>
                <RangePicker
                  onChange={handleDateRangeChange}
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: 280 }}
                />
                <Select
                  value={filters.channel}
                  onChange={handleChannelChange}
                  style={{ width: 140 }}
                  options={[
                    { value: 'all', label: '全部渠道' },
                    { value: 'wechat', label: '微信公众号' },
                    { value: 'workWechat', label: '企业微信' },
                    { value: 'dingtalk', label: '钉钉' },
                  ]}
                />
                <Select
                  value={filters.groupBy}
                  onChange={handleGroupByChange}
                  style={{ width: 120 }}
                  options={[
                    { value: 'day', label: '按天' },
                    { value: 'week', label: '按周' },
                    { value: 'month', label: '按月' },
                  ]}
                />
              </Space>
            </Space>

            {/* Summary Statistics */}
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <Statistic
                  title="总对话数"
                  value={data?.totalConversations || 0}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Statistic
                  title="平均响应时间"
                  value={data?.responseTime || 0}
                  suffix="秒"
                  precision={1}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Statistic
                  title="满意度"
                  value={data?.satisfactionRate || 0}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Statistic
                  title="活跃用户"
                  value={data?.activeUsers || 0}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Col>
            </Row>
          </Card>

          {/* Conversation Trends */}
          <Card title="对话趋势分析">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data?.timeSeriesData || []}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `日期: ${label}`}
                  formatter={(value: number, name: string) => {
                    const labelMap: Record<string, string> = {
                      conversations: '对话数',
                      activeUsers: '活跃用户',
                      satisfaction: '满意度',
                      responseTime: '响应时间'
                    };
                    return [value, labelMap[name] || name];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="conversations"
                  stroke="#1890ff"
                  name="对话数"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#52c41a"
                  name="活跃用户"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#faad14"
                  name="满意度"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Channel Distribution */}
          <Card title="渠道分布分析">
            <Row gutter={[24, 24]}>
              {data?.channelDistribution && Object.entries(data.channelDistribution).map(([channel, stats]) => (
                <Col xs={24} sm={12} lg={8} key={channel}>
                  <Card>
                    <Statistic
                      title={formatChannelName(channel)}
                      value={stats.conversations}
                      suffix={`占比 ${stats.percentage.toFixed(1)}%`}
                    />
                    <Space direction="vertical" style={{ marginTop: 16 }}>
                      <Typography.Text type="secondary">
                        平均响应时间: {stats.avgResponseTime.toFixed(1)}秒
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        满意度: {stats.satisfactionRate.toFixed(1)}%
                      </Typography.Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Common Queries Analysis */}
          <Card title="常见问题分析">
            <Row gutter={[24, 24]}>
              {data?.commonQueries.slice(0, 6).map((item, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card size="small">
                    <Space direction="vertical">
                      <Typography.Text strong>{item.query}</Typography.Text>
                      <Typography.Text type="secondary">
                        出现次数: {item.count}
                        {item.category && ` | 类别: ${item.category}`}
                      </Typography.Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Space>
      </Spin>
    </div>
  );
};
