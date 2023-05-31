/** category endpoints body and response type */
export type Category = {
  _id: string;
  name: string;
  user: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CategoryResponse = {
  message: string;
  categories: Category[];
  totalDoc: number;
  totalPages: number;
};

export type CreateCategoryBody = {
  categoryName: string;
  status: 'published' | 'draft';
};

export type UpdateCategoryBody = {
  categoryId: string;
  updatedName: string;
  updatedStatus: string;
};

export type DeleteCategoryBody = {
  categoryId: string;
};

/** coupon endpoints body and response type */
export type Coupon = {
  _id: string;
  name: string;
  user: string;
  status: 'valid' | 'draft';
  percentage: number;
  createdAt: 'string';
  updatedAt: 'string';
};

export type GetCouponResponse = {
  message: string;
  categories: Coupon[];
  totalDoc: number;
  totalPages: number;
};

export type CreateCouponBody = {
  couponName: string;
  percentage: string;
  status: string;
};

export type UpdateCouponBody = {
  couponId: string;
  updatedName: string;
  updatedStatus: string;
  updatedPercentage: string;
};

export type DeleteCouponBody = {
  couponId: string;
};

export type ImgKitTokenRes = {
  token: string;
  expire: number;
  signature: string;
};
