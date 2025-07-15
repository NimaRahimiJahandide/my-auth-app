import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { ENV } from '@/config/env';
import { CancelableRequest } from '@/types';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance();

export type { CancelableRequest } from '@/types';

export const createCancelableRequest = <T>(
  requestFn: (cancelToken: CancelTokenSource) => Promise<T>
): CancelableRequest<T> => {
  const cancelTokenSource = axios.CancelToken.source();

  const promise = requestFn(cancelTokenSource).catch((error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    }
    throw error;
  });

  return {
    promise,
    cancel: () => cancelTokenSource.cancel('Operation canceled by user'),
  };
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new ApiError(
    `API Error: ${response.statusText}`,
    response.status
  );
};