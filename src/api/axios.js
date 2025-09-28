import axios from 'axios';

const API_URL = 'https://sklep-meblowy-api.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
});


apiClient.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;