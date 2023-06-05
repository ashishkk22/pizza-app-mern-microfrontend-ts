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
  coupons: Coupon[];
  totalDoc: number;
  totalPages: number;
};

export type CreateCouponBody = {
  couponName: string;
  percentage: number;
  status: string;
};

export type UpdateCouponBody = {
  couponId: string;
  updatedName: string;
  updatedStatus: string;
  updatedPercentage: number;
};

export type DeleteCouponBody = {
  couponId: string;
};

/** imagekit related endpoint's body and responses */

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

// ============ product related endpoint's body and res. ==========//

export type Product = {
  _id: string;
  name: string;
  user: string;
  category: string;
  description: string;
  image: string;
  price: number;
  hit: boolean;
  publish: boolean;
  available: boolean;
  createdAt: string;
};

export type GetProductResponse = {
  message: string;
  items: Product[];
  totalDoc: number;
  totalPages: number;
};

export type CreateProductBody = {
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  hit: boolean;
  publish: boolean;
  available: boolean;
};

export type UpdateProductBody = {
  id: string;
} & CreateProductBody;

export type DeleteProductBody = {
  id: string;
};

// ========== order related endpoints res and body ========= //

export type AddressType = {
  _id: string;
  address: string;
  name: string;
};

export type OrderStatus =
  | 'received'
  | 'prepared'
  | 'out_for_delivery'
  | 'completed';

export type Item = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  qty?: number | null;
};

export type OrderedItems = {
  _id: string;
  address: AddressType;
  customerId: string;
  items: Item[];
  discount: number;
  cartTotalQty: number;
  totalPrice: number;
  discountedPrice: number;
  paymentType: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type GetOrderResponse = {
  message: string;
  orders: OrderedItems[];
  totalDoc: number;
  totalPages: number;
};

export type ModifyOrderStatusBody = {
  orderId: string;
  changedStatus: OrderStatus;
};

/** is Auth related types */
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
