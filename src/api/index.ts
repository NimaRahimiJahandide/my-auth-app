import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { ENV } from '@/config/env';

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

// Cancelable request wrapper
export interface CancelableRequest<T> {
  request: Promise<T>;
  cancel: () => void;
}

export const createCancelableRequest = <T>(
  requestFn: (cancelToken: CancelTokenSource) => Promise<T>
): CancelableRequest<T> => {
  const cancelTokenSource = axios.CancelToken.source();

  const request = requestFn(cancelTokenSource).catch((error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    }
    throw error;
  });

  return {
    request,
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