export const ENV = {
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://randomuser.me/api',
} as const;