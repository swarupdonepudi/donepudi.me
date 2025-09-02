// API client configuration
// This file can be used for future API integrations

export const apiConfig = {
  baseUrl: process.env.VITE_API_URL || 'https://api.donepudi.me',
  timeout: 30000,
};

export const createApiClient = (config = {}) => {
  return {
    ...apiConfig,
    ...config,
  };
};