import React from 'react';
import type { MessageInfo } from '../../useXChat';
// Import only necessary types
import { DialogueEngine } from '../dialogue-engine/DialogueEngine';

interface Channel {
  id: string;
  name: string;
  type: 'web' | 'wechat' | 'app';
}

interface MultiChannelProps {
  channels: Channel[];
  onMessageReceived?: (message: MessageInfo<string>, channelId: string) => void;
}

type MessageHandler = (message: MessageInfo<string>) => void;
// Use MessageHandler directly in the component

export const MultiChannel: React.FC<MultiChannelProps> = ({
  channels = [],
  onMessageReceived,
}: MultiChannelProps) => {
  const handleChannelMessage = (channelId: string): MessageHandler => {
    return (message: MessageInfo<string>): void => {
      if (onMessageReceived) {
        onMessageReceived(message, channelId);
      }
    };
  };

  return (
    <div className="multi-channel">
      {channels.map((channel) => (
        <div key={channel.id} className="channel-container">
          <h3>{channel.name}</h3>
          <DialogueEngine onMessage={handleChannelMessage(channel.id)} language="zh-CN" />
        </div>
      ))}
    </div>
  );
};
