import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserInfo = {
  name: string;
  email: string;
  phoneNo: string;
  img: string;
};

//initialValue of the user slice
const initialState: UserInfo = {
  name: '',
  email: '',
  phoneNo: '',
  img: '',
};

export const PersonSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
});

export default PersonSlice.reducer;
