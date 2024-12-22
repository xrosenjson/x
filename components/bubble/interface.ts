import React from 'react';
// Will be imported once @types/antd is installed
type AvatarProps = any;
import type { MessageInfo } from '../useXChat';

export interface TypingOption {
  /**
   * @default 1
   */
  step?: number;
  /**
   * @default 50
   */
  interval?: number;
}

type SemanticType = 'avatar' | 'content' | 'header' | 'footer';

export interface BubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  message?: MessageInfo<string>;
  prefixCls?: string;
  rootClassName?: string;
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  classNames?: Partial<Record<SemanticType, string>>;
  avatar?: AvatarProps | React.ReactElement;
  placement?: 'start' | 'end';
  loading?: boolean;
  typing?: boolean | TypingOption;
  content?: React.ReactNode | object;
  messageRender?: (content: string) => React.ReactNode;
  loadingRender?: () => React.ReactNode;
  variant?: 'filled' | 'borderless' | 'outlined' | 'shadow';
  shape?: 'round' | 'corner';
  onTypingComplete?: VoidFunction;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  role?: 'user' | 'assistant';
}
