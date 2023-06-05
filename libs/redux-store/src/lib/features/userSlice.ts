import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { store, useAppDispatch, useAppSelector } from '../redux-store';
import { removeToken } from '@pizza-app/ui-shared';

type User = {
  name: string;
  email: string;
  photo: string;
  isAuth: boolean;
  TOKEN: string | null;
};

//initialValue of the auth slice
const initialState: User = {
  name: '',
  email: '',
  photo: '',
  TOKEN: '',
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
    removeUser: () => initialState,
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
    removeUser: () => {
      removeToken();
      dispatch(removeUser());
    },
  };
}

export function getAuthToken() {
  return store.getState().user.TOKEN ?? '';
}

export default UserSlice.reducer;
