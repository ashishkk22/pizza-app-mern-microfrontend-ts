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
