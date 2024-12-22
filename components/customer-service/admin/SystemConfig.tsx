import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Switch, Button, Card, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import useXRequest from '../../../components/x-request';
import type { Language } from '../../../components/customer-service/config';

interface SystemConfigProps {
  language?: Language;
}

interface ConfigFormData {
  defaultLanguage: Language;
  enabledChannels: string[];
  aiModel: string;
  maxResponseTime: number;
  enableAutoReply: boolean;
}

const labels = {
  'zh-CN': {
    title: '系统配置',
    save: '保存设置',
    language: {
      label: '默认语言',
      chinese: '中文',
      english: '英文'
    },
    channels: {
      label: '启用渠道',
      web: '网页',
      wechat: '微信',
      mobile: '移动端'
    },
    ai: {
      label: 'AI模型设置',
      model: 'AI模型',
      responseTime: '最大响应时间(秒)',
      autoReply: '启用自动回复'
    },
    messages: {
      success: '配置已更新',
      error: '更新配置失败'
    }
  },
  'en-US': {
    title: 'System Configuration',
    save: 'Save Settings',
    language: {
      label: 'Default Language',
      chinese: 'Chinese',
      english: 'English'
    },
    channels: {
      label: 'Enabled Channels',
      web: 'Web',
      wechat: 'WeChat',
      mobile: 'Mobile'
    },
    ai: {
      label: 'AI Model Settings',
      model: 'AI Model',
      responseTime: 'Max Response Time (s)',
      autoReply: 'Enable Auto Reply'
    },
    messages: {
      success: 'Configuration updated',
      error: 'Failed to update configuration'
    }
  }
};

export const SystemConfig: React.FC<SystemConfigProps> = ({ language = 'zh-CN' }) => {
  const [form] = Form.useForm<ConfigFormData>();
  const { request } = useXRequest();
  const l = labels[language];

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await request('/admin/config', {
          method: 'GET'
        });
        if (response.ok) {
          const config = await response.json();
          form.setFieldsValue(config);
        }
      } catch (error) {
        message.error(l.messages.error);
      }
    };
    fetchConfig();
  }, [form, l.messages.error, request]);

  const handleSubmit = async (values: ConfigFormData) => {
    try {
      const response = await request('/admin/config', {
        method: 'POST',
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        message.success(l.messages.success);
      } else {
        throw new Error('Failed to update config');
      }
    } catch (error) {
      message.error(l.messages.error);
    }
  };

  return (
    <div className="system-config">
      <div className="system-config-header">
        <h2>{l.title}</h2>
      </div>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            defaultLanguage: 'zh-CN',
            enabledChannels: ['web'],
            aiModel: 'gpt-3.5-turbo',
            maxResponseTime: 30,
            enableAutoReply: true
          }}
        >
          <Form.Item
            label={l.language.label}
            name="defaultLanguage"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="zh-CN">{l.language.chinese}</Select.Option>
              <Select.Option value="en-US">{l.language.english}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={l.channels.label}
            name="enabledChannels"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              <Select.Option value="web">{l.channels.web}</Select.Option>
              <Select.Option value="wechat">{l.channels.wechat}</Select.Option>
              <Select.Option value="mobile">{l.channels.mobile}</Select.Option>
            </Select>
          </Form.Item>

          <Card title={l.ai.label} className="config-section">
            <Form.Item
              label={l.ai.model}
              name="aiModel"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={l.ai.responseTime}
              name="maxResponseTime"
              rules={[{ required: true }]}
            >
              <Input type="number" min={1} max={120} />
            </Form.Item>

            <Form.Item
              label={l.ai.autoReply}
              name="enableAutoReply"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              {l.save}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
