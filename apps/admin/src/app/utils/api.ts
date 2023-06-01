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
  GetProductResponse,
  ImgKitTokenRes,
  ImgKitUploadData,
  ImgKitUploadRes,
  UpdateCategoryBody,
  UpdateCouponBody,
  UpdateProductBody,
} from './endPoint.type';
import { toast } from 'react-hot-toast';
import { environment } from '../../environments/environment';

const fetchLimits = {
  categoryLimit: 10,
  couponLimit: 10,
  productLimit: 10,
};

const API = axios.create({
  baseURL: 'http://localhost:5222',
  withCredentials: true,
});

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
