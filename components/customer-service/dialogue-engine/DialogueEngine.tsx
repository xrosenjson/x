import React, { FC } from 'react';
import { config } from '../../../src/config';
import useXAgent from '../../useXAgent';
import type { RequestFn } from '../../useXAgent';
import useXChat from '../../useXChat';
import type { MessageInfo } from '../../useXChat';
import XRequest from '../../x-request';
import type { XRequestParams } from '../../x-request';
import type { SSEOutput } from '../../x-stream';

import Bubble from '../../bubble';
import Sender from '../../sender';

interface DialogueEngineProps {
  apiKey?: string;
  onMessage?: (message: MessageInfo<string>) => void;
  language?: 'zh-CN' | 'en-US';
  baseURL?: string;
  model?: string;
}

// Use DialogueEngineProps directly in the component

export const DialogueEngine: FC<DialogueEngineProps> = ({
  apiKey = '',
  onMessage,

  baseURL = '',
  model = '',
}: DialogueEngineProps) => {
  const request: RequestFn<string> = (info, callbacks) => {
    const params: XRequestParams = {
      messages: (info.messages || []).map((msg) => ({ role: 'user', content: msg })),
      stream: true,
      model: model || info.model || '',
    };

    return XRequest({
      baseURL: `${config.backendUrl}/chat`,
      model,
      dangerouslyApiKey: apiKey,
    }).create<XRequestParams, SSEOutput>(params, {
      onUpdate: (chunk) => {
        if (chunk.data?.content) {
          callbacks.onUpdate(chunk.data.content as string);
        }
      },
      onSuccess: (chunks) => {
        const lastChunk = chunks[chunks.length - 1];
        if (lastChunk.data?.content) {
          callbacks.onSuccess(lastChunk.data.content as string);
        }
      },
      onError: callbacks.onError,
    });
  };

  const agent = useXAgent<string>({
    baseURL,
    model,
    dangerouslyApiKey: apiKey,
    request,
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
        status: 'local',
      });
    }
  };

  return (
    <div className="dialogue-engine">
      {messages.map((msg: MessageInfo<string>, index: number) => (
        <Bubble key={index} content={msg.message} typing={false} />
      ))}

      <Sender onSubmit={handleSend} disabled={!agent} prefixCls="x-sender" submitType="enter" />
    </div>
  );
};
