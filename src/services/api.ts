import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Orders API
export const ordersApi = {
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  getCallbackRecords: async () => {
    const response = await api.get('/orders/callback-records');
    return response.data;
  },
  getReissueRecords: async () => {
    const response = await api.get('/orders/reissue-records');
    return response.data;
  },
};

// Merchants API
export const paymentApi = {
  getChannelIdentifiers: async () => {
    const response = await api.get('/payment/channel-identifiers');
    return response.data;
  },
  getPaymentChannels: async () => {
    const response = await api.get('/payment/channels');
    return response.data;
  },
  getPaymentProducts: async () => {
    const response = await api.get('/payment/products');
    return response.data;
  },
};

export const merchantsApi = {
  getMerchants: async () => {
    const response = await api.get('/merchants');
    return response.data;
  },
  getMerchantById: async (id: string) => {
    const response = await api.get(`/merchants/${id}`);
    return response.data;
  },
  getMerchantBalance: async (id: string) => {
    const response = await api.get(`/merchants/${id}/balance`);
    return response.data;
  },
};

// Payment Channels API
export const paymentChannelsApi = {
  getChannels: async () => {
    const response = await api.get('/payment-channels');
    return response.data;
  },
  getChannelById: async (id: string) => {
    const response = await api.get(`/payment-channels/${id}`);
    return response.data;
  },
};

// Payment Products API
export const paymentProductsApi = {
  getProducts: async () => {
    const response = await api.get('/payment-products');
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await api.get(`/payment-products/${id}`);
    return response.data;
  },
};

// Analytics API
export const analyticsApi = {
  getMerchantStatistics: async () => {
    const response = await api.get('/analytics/merchants');
    return response.data;
  },
  getChannelStatistics: async () => {
    const response = await api.get('/analytics/channels');
    return response.data;
  },
  getProductStatistics: async () => {
    const response = await api.get('/analytics/products');
    return response.data;
  },
  getAgentStatistics: async () => {
    const response = await api.get('/analytics/agents');
    return response.data;
  },
  getMerchantStats: async () => {
    const response = await api.get('/analytics/merchant');
    return response.data;
  },
  getChannelStats: async () => {
    const response = await api.get('/analytics/channel');
    return response.data;
  },
  getProductStats: async () => {
    const response = await api.get('/analytics/product');
    return response.data;
  },
  getAgentStats: async () => {
    const response = await api.get('/analytics/agent');
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    // Log error or show notification
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default api;
