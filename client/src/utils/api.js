import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// initialize from storage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) setAuthToken(token);
}

export default api;

// Response interceptor to handle auth expiry globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      // clear stored auth and redirect to login
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (e) {}
      setAuthToken(null);
      if (typeof window !== 'undefined') window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
