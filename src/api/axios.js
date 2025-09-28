import axios from 'axios';

const API_URL = 'https://sklep-meblowy-api.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;