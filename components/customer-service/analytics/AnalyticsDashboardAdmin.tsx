import { Card, DatePicker, Select, Space, Spin, message } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import XRequest from '../../../components/x-request';
import type { AnalyticsParams, AnalyticsResponse } from './types';
import '../layout/styles.css';
import './styles.css';

interface AnalyticsDashboardAdminProps {
  language?: 'zh-CN' | 'en-US';
}

const labels = {
  'zh-CN': {
    title: '数据分析',
    overview: '总览',
    performance: '性能指标',
    satisfaction: '满意度',
    trends: '趋势分析',
    filters: {
      dateRange: '日期范围',
      channel: '渠道',
      channels: {
        all: '全部',
        web: '网页',
        wechat: '微信',
        mobile: '移动端',
      },
    },
  },
  'en-US': {
    title: 'Analytics',
    overview: 'Overview',
    performance: 'Performance',
    satisfaction: 'Satisfaction',
    trends: 'Trends',
    filters: {
      dateRange: 'Date Range',
      channel: 'Channel',
      channels: {
        all: 'All',
        web: 'Web',
        wechat: 'WeChat',
        mobile: 'Mobile',
      },
    },
  },
};

export const AnalyticsDashboardAdmin: React.FC<AnalyticsDashboardAdminProps> = ({
  language = 'zh-CN',
}) => {
  const t = labels[language];

  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [analyticsData, setAnalyticsData] = useState({
    conversations: 0,
    avgDuration: 0,
    responseTime: 0,
    resolutionRate: 0,
    satisfaction: 0,
    recommendation: 0,
    weeklyGrowth: 0,
    monthlyGrowth: 0,
  });

  const [loading, setLoading] = useState(false);
  const xRequest = XRequest({
    baseURL: '/api',
  });

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const params: AnalyticsParams = {
        ...(selectedChannel !== 'all' && { channel: selectedChannel }),
        ...(dateRange?.[0] &&
          dateRange[1] && {
            startDate: dateRange[0].format('YYYY-MM-DD'),
            endDate: dateRange[1].format('YYYY-MM-DD'),
          }),
      };

      await xRequest.create(params, {
        onSuccess: (chunks: AnalyticsResponse[]) => {
          const [data] = chunks;
          setAnalyticsData({
            conversations: data.total_conversations || 0,
            avgDuration: data.average_duration || 0,
            responseTime: data.response_time || 0,
            resolutionRate: data.resolution_rate || 0,
            satisfaction: data.satisfaction_rate || 0,
            recommendation: data.recommendation_rate || 0,
            weeklyGrowth: data.weekly_growth || 0,
            monthlyGrowth: data.monthly_growth || 0,
          });
        },
        onError: (error: Error) => {
          console.error('Failed to fetch analytics:', error);
          message.error(language === 'zh-CN' ? '获取数据失败' : 'Failed to fetch data');
        },
        onUpdate: () => {},
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      message.error(language === 'zh-CN' ? '获取数据失败' : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedChannel, dateRange]);

  const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates as [Dayjs | null, Dayjs | null]);
  };

  const handleChannelChange = (value: string) => {
    setSelectedChannel(value);
  };

  return (
    <div className="analytics-dashboard-admin">
      <h1 className="page-title">{t.title}</h1>

      <Card className="filters-card">
        <Space size="large">
          <div>
            <span className="filter-label">{t.filters.dateRange}: </span>
            <DatePicker.RangePicker onChange={handleDateRangeChange} disabled={loading} />
          </div>
          <div>
            <span className="filter-label">{t.filters.channel}: </span>
            <Select
              defaultValue="all"
              loading={loading}
              style={{ width: 120 }}
              onChange={handleChannelChange}
              options={[
                { value: 'all', label: t.filters.channels.all },
                { value: 'web', label: t.filters.channels.web },
                { value: 'wechat', label: t.filters.channels.wechat },
                { value: 'mobile', label: t.filters.channels.mobile },
              ]}
            />
          </div>
        </Space>
      </Card>

      <div className="analytics-grid">
        <Spin spinning={loading}>
          <div className="analytics-card">
            <h3>{t.overview}</h3>
            <div className="analytics-stats">
              <div className="stat-group">
                <div className="stat-item">
                  <span className="stat-label">总会话数</span>
                  <span className="stat-value">{analyticsData.conversations}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">平均会话时长</span>
                  <span className="stat-value">{analyticsData.avgDuration}分钟</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>{t.performance}</h3>
            <div className="analytics-stats">
              <div className="stat-group">
                <div className="stat-item">
                  <span className="stat-label">响应速度</span>
                  <span className="stat-value">{analyticsData.responseTime}秒</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">解决率</span>
                  <span className="stat-value">{analyticsData.resolutionRate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>{t.satisfaction}</h3>
            <div className="analytics-stats">
              <div className="stat-group">
                <div className="stat-item">
                  <span className="stat-label">满意度评分</span>
                  <span className="stat-value">{analyticsData.satisfaction}/5</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">推荐度</span>
                  <span className="stat-value">{analyticsData.recommendation}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>{t.trends}</h3>
            <div className="analytics-stats">
              <div className="stat-group">
                <div className="stat-item">
                  <span className="stat-label">周同比</span>
                  <span
                    className={`stat-value ${analyticsData.weeklyGrowth >= 0 ? 'trend-up' : 'trend-down'}`}
                  >
                    {analyticsData.weeklyGrowth >= 0 ? '+' : ''}
                    {analyticsData.weeklyGrowth}%
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">月同比</span>
                  <span
                    className={`stat-value ${analyticsData.monthlyGrowth >= 0 ? 'trend-up' : 'trend-down'}`}
                  >
                    {analyticsData.monthlyGrowth >= 0 ? '+' : ''}
                    {analyticsData.monthlyGrowth}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-charts">
            <Card className="chart-card">
              <h3>{language === 'zh-CN' ? '趋势分析' : 'Trend Analysis'}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    {
                      name: language === 'zh-CN' ? '周一' : 'Mon',
                      conversations: analyticsData.conversations * 0.8,
                      satisfaction: analyticsData.satisfaction * 0.9,
                    },
                    {
                      name: language === 'zh-CN' ? '周二' : 'Tue',
                      conversations: analyticsData.conversations * 0.9,
                      satisfaction: analyticsData.satisfaction * 0.95,
                    },
                    {
                      name: language === 'zh-CN' ? '周三' : 'Wed',
                      conversations: analyticsData.conversations,
                      satisfaction: analyticsData.satisfaction,
                    },
                    {
                      name: language === 'zh-CN' ? '周四' : 'Thu',
                      conversations: analyticsData.conversations * 1.1,
                      satisfaction: analyticsData.satisfaction * 1.02,
                    },
                    {
                      name: language === 'zh-CN' ? '周五' : 'Fri',
                      conversations: analyticsData.conversations * 1.2,
                      satisfaction: analyticsData.satisfaction * 1.05,
                    },
                    {
                      name: language === 'zh-CN' ? '周六' : 'Sat',
                      conversations: analyticsData.conversations * 0.7,
                      satisfaction: analyticsData.satisfaction * 0.98,
                    },
                    {
                      name: language === 'zh-CN' ? '周日' : 'Sun',
                      conversations: analyticsData.conversations * 0.6,
                      satisfaction: analyticsData.satisfaction * 0.97,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="conversations"
                    stroke="#1890ff"
                    name={language === 'zh-CN' ? '对话数量' : 'Conversations'}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#52c41a"
                    name={language === 'zh-CN' ? '满意度' : 'Satisfaction'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Spin>
      </div>
    </div>
  );
};
