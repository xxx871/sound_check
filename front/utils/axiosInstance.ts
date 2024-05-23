import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://host.docker.internal:3000/api/v1/',
});

export default axiosInstance;
