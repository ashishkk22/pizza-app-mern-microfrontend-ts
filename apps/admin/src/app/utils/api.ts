import axios from 'axios';
import {
  CategoryResponse,
  CreateCategoryBody,
  CreateCouponBody,
  CreateProductBody,
  DeleteCategoryBody,
  DeleteCouponBody,
  DeleteProductBody,
  GetCouponResponse,
  GetOrderResponse,
  GetProductResponse,
  ImgKitTokenRes,
  ImgKitUploadData,
  ImgKitUploadRes,
  ModifyOrderStatusBody,
  UpdateCategoryBody,
  UpdateCouponBody,
  UpdateProductBody,
  UserResponse,
} from './endPoint.type';
import { toast } from 'react-hot-toast';
import { environment } from '../../environments/environment';
import { getToken } from '@pizza-app/ui-shared';
import { getAuthToken } from '@pizza-app/redux-store';

const fetchLimits = {
  categoryLimit: 10,
  couponLimit: 10,
  productLimit: 10,
};

const API = axios.create({
  baseURL: environment.APP_BASE_URL,
  withCredentials: true,
});

const onRequest = (config: any) => {
  //getting the token from localStorage
  let token = getToken();

  if (!token) {
    token = getAuthToken();
  }
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

API.interceptors.request.use(onRequest);

/** ========= category related functions  ========== */
export const getCategories = (page: number) =>
  API.get<CategoryResponse>(
    `/category?limit=${fetchLimits.categoryLimit}&page=${page}`
  );

export const getAllCategories = () =>
  API.get<CategoryResponse>('/category/getAll');

export const createCategory = (body: CreateCategoryBody) =>
  API.post('/category/create', body);

export const updateCategory = (body: UpdateCategoryBody) =>
  API.patch('/category/update', body);

export const deleteCategory = (body: DeleteCategoryBody) =>
  API.post('/category/delete', body);

/** ==========  coupon related functions ============ */
export const getCoupons = (page: number) =>
  API.get<GetCouponResponse>(
    `/coupon?limit=${fetchLimits.couponLimit}&page=${page}`
  );

export const createCoupon = (body: CreateCouponBody) =>
  API.post('/coupon/create', body);

export const updateCoupon = (body: UpdateCouponBody) =>
  API.post('/coupon/update', body);

export const deleteCoupon = (body: DeleteCouponBody) =>
  API.post('/coupon/delete', body);

// ============= imagekit related functions ============ //

export const imageKitGenToken = () => API.get<ImgKitTokenRes>('/auth');

export const imageKitUpload = (body: ImgKitUploadData) =>
  axios.post<ImgKitUploadRes>(environment.APP_IMAGEKIT_UPLOAD_URL, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// =========== product related function =============//

export const getProducts = (page: number) =>
  API.get<GetProductResponse>(
    `/item?limit=${fetchLimits.productLimit}&page=${page}`
  );

export const createProduct = (body: CreateProductBody) =>
  API.post('/item/create', body);

export const updateProduct = (body: UpdateProductBody) =>
  API.post('/item/update', body);

export const deleteProduct = (body: DeleteProductBody) =>
  API.post('/item/delete', body);

// =========== order related function =============//

export const getOrders = (page: number, limit: number) =>
  API.get<GetOrderResponse>(`/admin/order?limit=${limit}&page=${page}`);

export const modifyOrderStatus = (data: ModifyOrderStatusBody) =>
  API.post('admin/order/statusUpdate', data);

/** ======= is auth related functions ============= */
export const checkAuth = () => API.get<UserResponse>('/user/isAuth');

// ============== to display the toast on the error ============== //
type ErrorResponse = {
  message: string;
};

//to display the error with the toast on endpoint failure
export const displayErrorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = (error.response?.data as ErrorResponse)?.message;
    if (errorMessage) toast.error(errorMessage);
  }
};
