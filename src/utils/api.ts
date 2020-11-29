import { notification } from 'antd';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/'
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const args = {
      message: 'Erro',
      description: error.response.data.message,
      duration: 3,
    };
    notification.error(args);
    return Promise.reject(error);
  });

export default api;