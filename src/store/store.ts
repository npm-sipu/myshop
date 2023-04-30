import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: [],
  preloadedState: {
    // Add your initial state here
  },
});

export default store;
