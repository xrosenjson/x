import { message } from 'antd';

export interface SystemConfigData {
  defaultLanguage: string;
  enableMultiChannel: boolean;
  enableKnowledgeBase: boolean;
  enableAnalytics: boolean;
  aiModel: string;
  responseLanguage: string;
  channels?: {
    [key: string]: {
      enabled: boolean;
      config: Record<string, any>;
    };
  };
}

export const fetchSystemConfig = async (): Promise<SystemConfigData> => {
  try {
    const response = await fetch('/admin/config');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch system config:', error);
    message.error('获取系统配置失败');
    throw error;
  }
};

export const saveSystemConfig = async (config: SystemConfigData): Promise<void> => {
  try {
    const response = await fetch('/admin/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    message.success('配置保存成功');
  } catch (error) {
    console.error('Failed to save system config:', error);
    message.error('保存配置失败');
    throw error;
  }
};
