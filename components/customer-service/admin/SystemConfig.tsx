import React, { useState, useCallback } from 'react';
import { Card, Form, Select, Switch, Button, message, Space } from 'antd';
import type { SelectValue } from 'antd/es/select';

import { SystemConfigData, fetchSystemConfig, saveSystemConfig } from './api';

interface ChannelConfig {
  enabled: boolean;
  config: Record<string, any>;
}

interface SystemConfigState extends SystemConfigData {
  channels: {
    [key: string]: ChannelConfig;
  };
}

const defaultConfig: SystemConfigState = {
  defaultLanguage: 'zh-CN',
  enableMultiChannel: true,
  enableKnowledgeBase: true,
  enableAnalytics: true,
  aiModel: 'gpt-4',
  responseLanguage: 'auto'
};

export const SystemConfig: React.FC = () => {
  const [config, setConfig] = useState<SystemConfigState>(defaultConfig);
  const [loading, setLoading] = useState(false);

  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSystemConfig();
      setConfig(data);
    } catch (error) {
      console.error('Failed to load config:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      await saveSystemConfig(config);
    } catch (error) {
      console.error('Failed to save config:', error);
    } finally {
      setLoading(false);
    }
  }, [config]);

  // Load config on mount
  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>系统配置</h2>
        <p style={{ color: '#666' }}>管理系统全局设置和功能开关</p>
      </div>

      <Card>
        <Form layout="vertical">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            {/* Language Settings */}
            <div>
              <h3 style={{ marginBottom: 16 }}>语言设置</h3>
              <Form.Item label="系统默认语言">
                <Select
                  value={config.defaultLanguage}
                  onChange={(value: SelectValue) => 
                    setConfig(prev => ({ ...prev, defaultLanguage: value as string }))
                  }
                  style={{ width: 200 }}
                >
                  <Select.Option value="zh-CN">简体中文</Select.Option>
                  <Select.Option value="en-US">English</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="AI响应语言">
                <Select
                  value={config.responseLanguage}
                  onChange={(value: SelectValue) =>
                    setConfig(prev => ({ ...prev, responseLanguage: value as string }))
                  }
                  style={{ width: 200 }}
                >
                  <Select.Option value="auto">自动匹配用户语言</Select.Option>
                  <Select.Option value="zh-CN">仅使用中文</Select.Option>
                  <Select.Option value="en-US">English Only</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {/* Feature Toggles */}
            <div>
              <h3 style={{ marginBottom: 16 }}>功能开关</h3>
              <Form.Item label="多渠道集成">
                <Switch
                  checked={config.enableMultiChannel}
                  onChange={checked =>
                    setConfig(prev => ({ ...prev, enableMultiChannel: checked }))
                  }
                />
              </Form.Item>

              <Form.Item label="知识库管理">
                <Switch
                  checked={config.enableKnowledgeBase}
                  onChange={checked =>
                    setConfig(prev => ({ ...prev, enableKnowledgeBase: checked }))
                  }
                />
              </Form.Item>

              <Form.Item label="数据分析">
                <Switch
                  checked={config.enableAnalytics}
                  onChange={checked =>
                    setConfig(prev => ({ ...prev, enableAnalytics: checked }))
                  }
                />
              </Form.Item>
            </div>

            {/* Channel Integration Settings */}
            <div>
              <h3 style={{ marginBottom: 16 }}>渠道集成设置</h3>
              <Form.Item label="微信公众号">
                <Switch
                  checked={config.channels?.wechat?.enabled}
                  onChange={checked =>
                    setConfig(prev => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        wechat: {
                          enabled: checked,
                          config: prev.channels?.wechat?.config || {}
                        }
                      }
                    }))
                  }
                />
              </Form.Item>

              <Form.Item label="企业微信">
                <Switch
                  checked={config.channels?.workWechat?.enabled}
                  onChange={checked =>
                    setConfig(prev => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        workWechat: {
                          enabled: checked,
                          config: prev.channels?.workWechat?.config || {}
                        }
                      }
                    }))
                  }
                />
              </Form.Item>

              <Form.Item label="钉钉">
                <Switch
                  checked={config.channels?.dingtalk?.enabled}
                  onChange={checked =>
                    setConfig(prev => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        dingtalk: {
                          enabled: checked,
                          config: prev.channels?.dingtalk?.config || {}
                        }
                      }
                    }))
                  }
                />
              </Form.Item>
            </div>

            {/* AI Model Settings */}
            <div>
              <h3 style={{ marginBottom: 16 }}>AI模型设置</h3>
              <Form.Item label="默认AI模型">
                <Select
                  value={config.aiModel}
                  onChange={(value: SelectValue) =>
                    setConfig(prev => ({ ...prev, aiModel: value as string }))
                  }
                  style={{ width: 200 }}
                >
                  <Select.Option value="gpt-4">GPT-4（推荐）</Select.Option>
                  <Select.Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                onClick={handleSave}
                loading={loading}
                style={{ minWidth: 120 }}
              >
                保存配置
              </Button>
            </div>
          </Space>
        </Form>
      </Card>
    </div>
  );
};
