import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../redux-store';

type User = {
  name: string;
  email: string;
  photo: string;
  isAuth: boolean;
  TOKEN: string | null;
};

const Token = localStorage.getItem('TOKEN');
//initialValue of the auth slice
const initialState: User = {
  name: '',
  email: '',
  photo: '',
  TOKEN: Token,
  isAuth: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.TOKEN = action.payload.TOKEN;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.photo = '';
      state.TOKEN = '';
      state.isAuth = false;
    },
  },
});
const { removeUser, setUser } = UserSlice.actions;

export function useUserStore() {
  const { name, TOKEN, email, photo, isAuth } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  return {
    name,
    TOKEN,
    email,
    photo,
    isAuth,
    addUser: (payload: User) => dispatch(setUser(payload)),
  };
}

export default UserSlice.reducer;
