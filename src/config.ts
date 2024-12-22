export const config = {
  backendUrl: 'https://app-qdvfycrs.fly.dev',
  defaultLanguage: 'zh-CN',
  supportedLanguages: ['zh-CN', 'en-US'],
  api: {
    chat: '/chat',
    knowledge: '/knowledge',
    analytics: '/analytics',
    channels: '/channels',
    search: '/knowledge', // Alias for knowledge search endpoint
  },
};
