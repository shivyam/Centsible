import axios from 'axios';

// No need to explicitly use AxiosInstance here
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { "ngrok-skip-browser-warning": "true" }
});

export default axiosInstance;
