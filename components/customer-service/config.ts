export type Language = 'zh-CN' | 'en-US';

export const config = {
  backendUrl: process.env.VITE_BACKEND_URL || 'http://localhost:3000',
  defaultLanguage: 'zh-CN' as Language,
  supportedLanguages: ['zh-CN', 'en-US'] as Language[],
  authCookieName: 'x_auth_token',
};

export const messages = {
  'zh-CN': {
    accessDenied: '访问被拒绝',
    unauthorized: '未经授权',
    loading: '加载中...',
    sessionExpired: '会话已过期，请重新登录',
    networkError: '网络错误，请稍后重试',
  },
  'en-US': {
    accessDenied: 'Access Denied',
    unauthorized: 'Unauthorized',
    loading: 'Loading...',
    sessionExpired: 'Session expired, please login again',
    networkError: 'Network error, please try again later',
  },
} as const;
