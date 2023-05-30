import axios from 'axios';
import { environment } from '../environments/environment';
const API = axios.create({
  baseURL: 'http://localhost:5222',
  withCredentials: true,
  // headers: {
  //   'Content-type': 'application/json',
  //   Accept: 'application/json',
  // },
});
type ImgKitTokenRes = {
  token: string;
  expire: number;
  signature: string;
};

type ImgKitUploadData = {
  useUniqueFileName: boolean;
  file: string;
  publicKey: string;
  fileName: string;
} & ImgKitTokenRes;

type ImgKitUploadRes = {
  fileId: string;
  name: string;
  size: number;
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
};
type User = {
  photo: string;
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  activated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type UserResponse = {
  message: string;
  user: User;
  TOKEN: string;
};
type SignUpBody = {
  name: string;
  email: string;
  photo: string;
  password: string;
};
type SignUpRes = {
  message: string;
  email: string;
  hash: string;
};
type VerifyOtpBody = {
  email: string;
  hash: string;
  otp: string;
};

type SignInBody = {
  email: string;
  password: string;
};

export const imageKitGenToken = () => API.get<ImgKitTokenRes>('/auth');

export const imageKitUpload = (body: ImgKitUploadData) =>
  axios.post<ImgKitUploadRes>(environment.APP_IMAGEKIT_UPLOAD_URL, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const signup = (data: SignUpBody) =>
  API.post<SignUpRes>('/user/signup', data);

export const verifyOtp = (data: VerifyOtpBody) =>
  API.post('/user/verify', data);

export const signin = (data: SignInBody) =>
  API.post<UserResponse>('/user/signin', data);
export const isAuth = () => API.get<UserResponse>('/user/isAuth');
