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

/** product endpoints body and response type */
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
