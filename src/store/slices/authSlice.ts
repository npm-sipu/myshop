import { createSelector, createSlice, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from '../store';
import instance from '../../hooks/axios/userApi';
import { AxiosError } from 'axios';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

// const dispatch = useAppDispatch()

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', payload.token);
      console.log('Auth state after login:', state.token);
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
);

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions;

// instance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Handle token expiration or unauthorized access here
//       // For example, you can dispatch a logout action
//       dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

export const login = (data: { email: string; password: string }): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await instance.post("api/users/login", data);
    const responseData = response.data;
    console.log(responseData)

    dispatch(loginSuccess(responseData));
    localStorage.setItem("userInfo", JSON.stringify(responseData));
  } catch (error: any) {
    dispatch(loginFail(error.message));
  }
};



export default authSlice.reducer;











// export const login = (data: { email: string; password: string }): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
//   const { email, password } = data;

//   try {
//     dispatch(loginStart());

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await instance.post("/users/login", data, config);
//     const responseData = response.data;

//     dispatch(loginSuccess(responseData));

//     localStorage.setItem("userInfo", JSON.stringify(responseData));
//   } catch (error: any) {
//     dispatch(loginFail(error.message));
//   }
// };