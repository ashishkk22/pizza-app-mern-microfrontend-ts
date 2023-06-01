import axios from 'axios';
import { CategoryResponse, GetProductResponse } from './EndPoints.type';
import { environment } from '../../environments/environment';

const fetchLimits = {
  categoryLimit: 10,
  couponLimit: 10,
  productLimit: 15,
};

const API = axios.create({
  baseURL: environment.baseUrl,
  withCredentials: true,
});

export const getAllCategories = () =>
  API.get<CategoryResponse>('/category/getAll');

export const getProducts = (page: number) =>
  API.get<GetProductResponse>(
    `/item?limit=${fetchLimits.productLimit}&page=${page}`
  );
