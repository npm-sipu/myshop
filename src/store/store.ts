import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import thunkMiddleware from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store;







// import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
// import cartReducer from './slices/cartSlice';
// import authReducer from './slices/authSlice'
// import { ThunkDispatch } from 'redux-thunk';
// import thunkMiddleware from 'redux-thunk';
// import { AnyAction } from 'redux';


// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     auth : authReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunkMiddleware),
//   preloadedState: {
//     // Add your initial state here
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
// export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

// export default store;
