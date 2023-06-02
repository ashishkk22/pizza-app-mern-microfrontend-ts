/** order endpoints body and response type */

export type AddressType = {
  _id: string;
  address: string;
  name: string;
};

export type Item = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  qty?: number | null;
};

export type OrderStatus =
  | 'received'
  | 'prepared'
  | 'out_for_delivery'
  | 'completed';

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
