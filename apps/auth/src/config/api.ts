import axios from 'axios';
import { environment } from '../environments/environment';
import {
  ChangePassBody,
  ImgKitTokenRes,
  ImgKitUploadData,
  ImgKitUploadRes,
  SignInBody,
  SignUpBody,
  SignUpRes,
  User,
  UserResponse,
  VerifyOtpBody,
} from '../utils/endPoints.types';
import { getToken } from '@pizza-app/ui-shared';
import { getAuthToken } from '@pizza-app/redux-store';

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

export const imageKitGenToken = () => API.get<ImgKitTokenRes>('/auth');

export const imageKitUpload = (body: ImgKitUploadData) =>
  axios.post<ImgKitUploadRes>(environment.APP_IMAGEKIT_UPLOAD_URL, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const signup = (data: SignUpBody) =>
  API.post<SignUpRes>('/user/signup', data);

export const verifyOtp = (data: VerifyOtpBody) =>
  API.post<UserResponse>('/user/verify', data);

export const signin = (data: SignInBody) =>
  API.post<UserResponse>('/user/signin', data);

export const changePass = (data: ChangePassBody) =>
  API.post('/user/changePass', data);
