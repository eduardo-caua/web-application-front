import axios from 'axios';

import { responseInterceptor, errorInterceptor } from './interceptors';

const API = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE,
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { API };
