import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { store } from '../store/store';
import { logout } from '../store/authSlice';
import { API_BASE_URL } from '../utils/apiConfig';

/** Body of every backend response: {"success": bool, "message": "...", "data": ...} */
export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  status?: number;
  error?: string;
  [key: string]: any;
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth?.token;

    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 on a request that carried a token: the JWT expired or is invalid,
    // so end the session (a wrong-password login also answers 401, without a token)
    if (error.response?.status === 401 && error.config?.headers?.Authorization) {
      store.dispatch(logout());
    }

    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your internet connection.';
    }

    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse<ApiResponse>) => response.data;

/**
 * Failed-call result for the service functions: the backend's
 * {"success": false, "message": "..."} body, or a fallback message.
 */
export const toErrorResult = (error: any, fallback: string): ApiResponse => ({
  success: false,
  status: error?.response?.status,
  message: error?.response?.data?.message || error?.message || fallback,
  error: error?.message || fallback,
});

/**
 * Retry logic for failed GET requests (writes are never retried, so an
 * order or payment is not created twice)
 */
const retryRequest = async <T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    const status = (error as any)?.response?.status;
    if (retries > 0 && (!(error as any)?.response || status >= 500)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

const requests = {
  get: (url: string, params?: unknown, headers?: Record<string, string>) =>
    retryRequest(() =>
      instance.get(url, { params, headers }).then(responseBody)
    ),

  post: (url: string, body?: unknown) =>
    instance.post(url, body).then(responseBody),

  put: (url: string, body?: unknown) =>
    instance.put(url, body).then(responseBody),

  patch: (url: string, body?: unknown) =>
    instance.patch(url, body).then(responseBody),

  delete: (url: string, body?: unknown) =>
    instance.delete(url, { data: body }).then(responseBody),

  upload: (url: string, formData: FormData) =>
    instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(responseBody),
};

export default requests;
