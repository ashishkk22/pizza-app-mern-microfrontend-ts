import axios from 'axios';
import { GetOrderResponse } from './Endpoints.type';
import { environment } from '../../environments/environment';

const fetchLimits = {
  orderLimit: 10,
};

const API = axios.create({
  baseURL: environment.baseUrl,
  withCredentials: true,
});

const onRequest = (config: any) => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

API.interceptors.request.use(onRequest);

/** =========== order related functions ============== */
export const getOrders = (page: number) =>
  API.get<GetOrderResponse>(
    `/order?limit=${fetchLimits.orderLimit}&page=${page}`
  );
