import axios from 'axios';
import { environment } from '../environments/environment';
const API = axios.create({
  baseURL: 'http://localhost:5222',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
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
  AITags: any;
};

export const imageKitGenToken = () => API.get<ImgKitTokenRes>('/auth');
export const imageKitUpload = (body: ImgKitUploadData) =>
  axios.post<ImgKitUploadRes>(environment.APP_IMAGEKIT_UPLOAD_URL, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
