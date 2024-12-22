import React from 'react';
import type { MessageInfo } from '../../useXChat';
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

export const MultiChannel: React.FC<MultiChannelProps> = ({
  channels = [],
  onMessageReceived,
}: MultiChannelProps) => {
  const handleChannelMessage = (channelId: string): ((message: MessageInfo<string>) => void) => {
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
          <DialogueEngine
            onMessage={handleChannelMessage(channel.id)}
            language="zh-CN"
          />
        </div>
      ))}
    </div>
  );
};
