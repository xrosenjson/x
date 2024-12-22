export const config = {
  backendUrl: 'https://app-qdvfycrs.fly.dev',
  defaultLanguage: 'zh-CN',
  supportedLanguages: ['zh-CN', 'en-US'],
  api: {
    chat: {
      path: '/chat',
      method: 'POST',
    },
    knowledge: {
      path: '/knowledge',
      method: 'GET',
    },
    analytics: {
      path: '/analytics',
      method: 'GET',
    },
    channels: {
      path: '/channels',
      method: 'GET',
    },
  },
};
