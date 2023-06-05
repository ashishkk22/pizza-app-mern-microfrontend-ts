export type ImgKitTokenRes = {
  token: string;
  expire: number;
  signature: string;
};

export type ImgKitUploadData = {
  useUniqueFileName: boolean;
  file: string;
  publicKey: string;
  fileName: string;
} & ImgKitTokenRes;

export type ImgKitUploadRes = {
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
export type User = {
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
export type UserResponse = {
  message: string;
  user: User;
  TOKEN: string;
};
export type SignUpBody = {
  name: string;
  email: string;
  photo: string;
  password: string;
};
export type SignUpRes = {
  message: string;
  email: string;
  hash: string;
};
export type VerifyOtpBody = {
  email: string;
  hash: string;
  otp: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type ChangePassBody = {
  oldPassword: string;
  newPassword: string;
};
