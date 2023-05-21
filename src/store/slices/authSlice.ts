import { createSelector, createSlice, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from '../store';
import instance from '../../hooks/axios/userApi';

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
  name?: string;
  email?: string;
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
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.name = payload.name; // Set the name field with payload.name
      localStorage.setItem('token', payload.token);
    },
    registerFail: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
      state.name = undefined; // Reset the name field to undefined in case of failure
      localStorage.removeItem('token');
    },
    userUpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userUpdateSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.name = payload.name; // Update the name field with the updated name
      state.email = payload.email; // Update the email field with the updated email
    },
    userUpdateFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
},);

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
);

export const { loginStart, loginSuccess, loginFail, logout, registerStart, registerSuccess, registerFail, userUpdateStart,userUpdateSuccess, userUpdateFail} = authSlice.actions;



export const login = (data: { email: string; password: string }): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await instance.post("api/users/login", data);
    const responseData = response.data;
    console.log(responseData)

    dispatch(loginSuccess(responseData));
    localStorage.setItem("userInfo", JSON.stringify(responseData));
  } catch (error: any) {
    console.log(error.message)
    dispatch(loginFail(error.message));
    
  }
};

export const register = (data: { name: string; email: string; password: string }): AppThunk => async (dispatch) => {
  try {
    dispatch(registerStart());

    const response = await instance.post("api/users/", data);
    const responseData = response.data;
    console.log(responseData);

    dispatch(registerSuccess(responseData));
    localStorage.setItem("userInfo", JSON.stringify(responseData));
  } catch (error: any) {
    console.log(error.message);
    dispatch(registerFail(error.message));
  }
};

export const userUpdate = (data: { name: string; email: string; password: string }): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(userUpdateStart());

    const { token } = selectAuth(getState()); // Retrieve the token from the current user

    const response = await instance.put("api/users/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = response.data;
    console.log(responseData);

    dispatch(userUpdateSuccess(responseData));
    localStorage.setItem("userInfo", JSON.stringify(responseData));
  } catch (error: any) {
    console.log(error.message);
    dispatch(userUpdateFail(error.message));
  }
};

export const logoutFunc = (): AppThunk => async () => {
  try {
    localStorage.removeItem('userInfo');
  } catch (error: any) {
    console.log(error.message);
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