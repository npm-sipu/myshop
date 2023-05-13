import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice'
import { ThunkDispatch } from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import { AnyAction } from 'redux';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    user : userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  preloadedState: {
    // Add your initial state here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
