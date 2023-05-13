import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

interface User {
    email: string;
    password: string;
  }
  
  interface UserState {
    isAuthenticated: boolean;
    user: User | null;
  }
  
  const initialState: UserState = {
    isAuthenticated: false,
    user: null,
  };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string, user: User }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = createSelector([state => state.user], user => user);
export const selectIsAuthenticated = createSelector(
  [state => state.isAuthenticated],
  isAuthenticated => isAuthenticated
);

export default userSlice.reducer;
