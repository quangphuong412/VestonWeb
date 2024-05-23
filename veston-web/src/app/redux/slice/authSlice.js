import { createSlice } from '@reduxjs/toolkit';
import { COOKIE_KEY } from '@/web.config';

const initialState = {
  token: null,
  user: null,
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      localStorage.setItem(COOKIE_KEY.API_TOKEN_KEY, token);
      state.user = user;
      state.token = token;
      state.isAuth = true;
    },
    loginError: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem(COOKIE_KEY.API_TOKEN_KEY);
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginError, logout } =
  authSlice.actions;
export default authSlice.reducer;
