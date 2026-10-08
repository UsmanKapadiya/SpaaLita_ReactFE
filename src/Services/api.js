import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/authSlice';
import { API_BASE_URL } from '../utils/apiConfig';

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
    const state = store.getState();
    const token = state.auth?.token;

    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// instance.interceptors.request.use(
//   function (config) {
//     let token;
    
//     // Try to get token from cookies first
//     if (Cookies.get('authToken')) {
//       try {
//         const cookieData = JSON.parse(Cookies.get('authToken'));
//         token = cookieData.token;
//       } catch (e) {
//         console.error('Failed to parse cookie token:', e);
//       }
//     }
    
//     // Fallback to localStorage
//     const authToken = token || localStorage.getItem('authToken');
    
//     if (authToken && !config.headers['Authorization']) {
//       config.headers['Authorization'] = `${authToken}`;
//     }
    
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

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

const responseBody = (response) => response.data;

/**
 * Failed-call result for the service functions: the backend's
 * {"success": false, "message": "..."} body, or a fallback message.
 */
export const toErrorResult = (error, fallback) => ({
  success: false,
  status: error?.response?.status,
  message: error?.response?.data?.message || error?.message || fallback,
  error: error?.message || fallback,
});

/**
 * Retry logic for failed GET requests (writes are never retried, so an
 * order or payment is not created twice)
 */
const retryRequest = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (!error.response || error.response.status >= 500)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

const requests = {
  get: (url, params, headers) =>
    retryRequest(() => 
      instance.get(url, { params, headers }).then(responseBody)
    ),

  post: (url, body) =>
    instance.post(url, body).then(responseBody),

  uploadPosts: (url, body) =>
    instance.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(responseBody),
    
  uploadPut: (url, body) =>
    instance.put(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(responseBody),

  customPost: (url, body, token) => {
    return instance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(responseBody);
  },

  put: (url, body) =>
    instance.put(url, body).then(responseBody),

  patch: (url, body) =>
    instance.patch(url, body).then(responseBody),

  delete: (url, body) =>
    instance.delete(url, { data: body }).then(responseBody),

  upload: (url, formData) =>
    instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(responseBody),
};

export default requests;