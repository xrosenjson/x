import React from 'react';
// Will be imported once @types/antd is installed
type ButtonProps = any;

export type SubmitType = 'enter' | 'shiftEnter' | false;

export interface SenderComponents {
  input?: CustomizeComponent<any>;
}

export type ActionsRender = (
  ori: React.ReactNode,
  info: {
    components: {
      SendButton: React.ComponentType<ButtonProps>;
      ClearButton: React.ComponentType<ButtonProps>;
      LoadingButton: React.ComponentType<ButtonProps>;
    };
  },
) => React.ReactNode;

export type AllowSpeech =
  | boolean
  | {
      lang?: string;
      continuous?: boolean;
      interimResults?: boolean;
    };

export interface SenderProps {
  prefixCls?: string;
  defaultValue?: string;
  value?: string;
  loading?: boolean;
  readOnly?: boolean;
  submitType?: SubmitType;
  disabled?: boolean;
  onSubmit?: (message: string) => void;
  onChange?: (value: string) => void;
  onCancel?: VoidFunction;
  onKeyDown?: React.KeyboardEventHandler<any>;
  onPaste?: React.ClipboardEventHandler<HTMLElement>;
  onPasteFile?: (file: File) => void;
  components?: SenderComponents;
  styles?: {
    prefix?: React.CSSProperties;
    input?: React.CSSProperties;
    actions?: React.CSSProperties;
  };
  rootClassName?: string;
  classNames?: {
    prefix?: string;
    input?: string;
    actions?: string;
  };
  style?: React.CSSProperties;
  className?: string;
  actions?: React.ReactNode | ActionsRender;
  allowSpeech?: AllowSpeech;
  prefix?: React.ReactNode;
  header?: React.ReactNode;
}

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;

export type CustomizeComponent<T = any> = Component<T>;
