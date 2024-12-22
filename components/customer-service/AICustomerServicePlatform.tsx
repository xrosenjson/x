import React from 'react';
import { DialogueEngine } from './dialogue-engine/DialogueEngine';
import { KnowledgeBase } from './knowledge-base/KnowledgeBase';
import { MultiChannel } from './multi-channel/MultiChannel';
import { AnalyticsDashboard } from './analytics-dashboard/AnalyticsDashboard';
import type { MessageInfo } from '../useXChat';
import type { CommonProps } from './index';

interface AICustomerServicePlatformProps extends CommonProps {
  companyName?: string;
  channels?: Array<{
    id: string;
    name: string;
    type: 'web' | 'wechat' | 'app';
  }>;
}

export const AICustomerServicePlatform: React.FC<AICustomerServicePlatformProps> = ({
  language = 'zh-CN',
  apiKey,
  companyName,
  channels = [],
  baseURL,
  model,
}: AICustomerServicePlatformProps) => {
  const [currentQuery, setCurrentQuery] = React.useState<string>('');
  // Track active channel - will be used in future implementation
  // const [selectedChannel, setSelectedChannel] = React.useState<string>('');

  const handleMessage = (message: MessageInfo<string>): void => {
    // Update knowledge base query
    setCurrentQuery(message.message);
  };

  const handleChannelMessage = (message: MessageInfo<string>, _channelId: string): void => {
    // Channel-specific handling will be implemented in future
    handleMessage(message);
  };

  return (
    <div className="ai-customer-service-platform">
      <div className="platform-header">
        <h1>{companyName || '智能客服平台'}</h1>
      </div>
      
      <div className="platform-content">
        <div className="left-panel">
          <MultiChannel 
            channels={channels}
            onMessageReceived={handleChannelMessage}
          />
        </div>
        
        <div className="main-panel">
          <DialogueEngine
            apiKey={apiKey}
            language={language}
            onMessage={handleMessage}
            baseURL={baseURL}
            model={model}
          />
        </div>
        
        <div className="right-panel">
          <KnowledgeBase
            language={language}
            searchQuery={currentQuery}
          />
        </div>
      </div>
      
      <div className="platform-footer">
        <AnalyticsDashboard
          language={language}
          timeRange="day"
        />
      </div>
    </div>
  );
};
