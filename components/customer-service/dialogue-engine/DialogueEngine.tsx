import React from 'react';
import useXAgent from '../../useXAgent';
import useXChat from '../../useXChat';
import type { MessageInfo } from '../../useXChat';
import XRequest from '../../x-request';

import Bubble from '../../bubble';
import Sender from '../../sender';

interface DialogueEngineProps {
  apiKey?: string;
  onMessage?: (message: MessageInfo<string>) => void;
  language?: 'zh-CN' | 'en-US';
  baseURL?: string;
  model?: string;
}

export const DialogueEngine: React.FC<DialogueEngineProps> = ({
  apiKey = '',
  onMessage,
  language = 'zh-CN',
  baseURL = '',
  model = '',
}: DialogueEngineProps) => {
  const agent = useXAgent<string>({
    baseURL,
    model,
    dangerouslyApiKey: apiKey,
    request: (info, callbacks) => {
      // Include language in the request parameters
      const params = {
        ...info,
        options: {
          ...info.options,
          locale: language
        }
      };
      return XRequest({
        baseURL: baseURL!,
        model,
        dangerouslyApiKey: apiKey
      }).create(params, callbacks);
    }
  });

  const { onRequest, messages } = useXChat<string>({
    agent: agent[0],
    defaultMessages: [],
  });

  const handleSend = (content: string): void => {
    onRequest(content);
    if (onMessage) {
      onMessage({
        id: Date.now().toString(),
        message: content,
        status: 'local'
      });
    }
  };

  return (
    <div className="dialogue-engine">
      {messages.map((msg: MessageInfo<string>, index: number) => (
        <Bubble
          key={index}
          message={msg}
          typing={false}
        />
      ))}
      
      <Sender
        onSend={handleSend}
        disabled={!agent}
      />
    </div>
  );
};
