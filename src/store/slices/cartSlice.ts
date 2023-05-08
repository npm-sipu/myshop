import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../hooks/useTypes';
import { AppThunk } from '../store';

const CART_LOCAL_STORAGE_KEY = 'cart';

// Try to get the cart state from local storage
const getSavedCartState = (): CartItem[] | null => {
  const cartStateJSON = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  if (cartStateJSON) {
    try {
      const cartState = JSON.parse(cartStateJSON) as CartItem[];
      return cartState;
    } catch {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
    }
  }
  return null;
};


const initialState: CartItem[] = getSavedCartState() ?? [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartItem[], action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.qty += newItem.qty;
      } else {
        // Otherwise, add the new item to the cart
        state.push(newItem);
      }
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    removeItem: (state: CartItem[], action: PayloadAction<string>) => {
      const itemId = action.payload;
      const newState = state.filter((item) => item.id !== itemId);
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
    updateItemQuantity: (state: CartItem[], action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const item = state.find((item) => item.id === itemId);
      if (item) {
        item.qty = quantity;
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    },
    clearCart: (): CartItem[] => {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
      return [];
    },
  },
});

// When the user logs in, check if there are any items in local storage
// and add them to the cart state
export const syncCartState = (): AppThunk => (dispatch) => {
  const savedCartState = getSavedCartState();
  if (savedCartState) {
    dispatch({ type: 'cart/clearCart' });
    savedCartState.forEach((item) => dispatch({ type: 'cart/addItem', payload: item }));
  }
};

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
