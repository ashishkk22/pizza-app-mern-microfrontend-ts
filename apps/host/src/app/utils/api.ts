import axios from 'axios';
import { GetOrderResponse, UserResponse } from './Endpoints.type';
import { environment } from '../../environments/environment';
import { getToken } from '@pizza-app/ui-shared';
import { getAuthToken } from '@pizza-app/redux-store';

const fetchLimits = {
  orderLimit: 10,
};

const API = axios.create({
  baseURL: environment.baseUrl,
  withCredentials: true,
});

const onRequest = (config: any) => {
  //getting the token from localStorage
  let token = getToken();

  if (!token) {
    token = getAuthToken();
    console.log(getAuthToken(), token, 'from the redux store');
  }
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

/** ======= is auth related functions ============= */
export const checkAuth = () => API.get<UserResponse>('/user/isAuth');
