import axios from 'axios';

const axiosClient = axios.create({ baseURL: '/' });

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

const clearAuthStorage = () => {
  ['accessToken', 'refreshToken', 'userId', 'username'].forEach((k) =>
    localStorage.removeItem(k)
  );
};

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && !config.url?.startsWith('/api/auth/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (original.url?.startsWith('/api/auth/')) return Promise.reject(error);
    if (error.response?.status !== 401 || original._retry) return Promise.reject(error);

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return axiosClient(original);
      });
    }

    isRefreshing = true;
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      clearAuthStorage();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post('/api/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', data.accessToken);
      processQueue(null, data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosClient(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuthStorage();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;
