export type AddressType = {
  _id: string;
  address: string;
  name: string;
};
export type GetAddressRes = {
  message: string;
  address: AddressType[];
};

export type AddAddressBody = {
  name: string;
  address: string;
};

export type DeleteAddressBody = {
  id: string;
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
