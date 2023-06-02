import axios from 'axios';
import { environment } from '../environments/environment';
import {
  AddAddressBody,
  CreateOrderBody,
  DeleteAddressBody,
  GetAddressRes,
  GetCouponResponse,
} from './Endpoints.type';

const fetchLimits = {
  orderLimit: 10,
  couponLimit: 10,
  productLimit: 15,
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

export const getAddress = () => API.get<GetAddressRes>('/user/getAddress');

export const addAddress = (body: AddAddressBody) =>
  API.post('/user/addAddress', body);

export const deleteAddress = (body: DeleteAddressBody) =>
  API.post('/user/deleteAddress', body);

/** ==========  coupon related functions ============ */
export const getCoupons = () =>
  API.get<GetCouponResponse>(`/coupon?limit=${fetchLimits.couponLimit}&page=1`);

/** =========== order related functions ============== */

export const createOrder = (body: CreateOrderBody) =>
  API.post('/order/create', body);
