import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { CartItem } from '../../hooks/useTypes';


const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
        const item = action.payload;
        item.id = nanoid();
        state.push(item);
      },
      removeItem: (state, action: PayloadAction<string>) => {
        const itemId = action.payload;
        return state.filter(item => item.id !== itemId);
      },
      updateItemQuantity: (state, action: PayloadAction<{ itemId: string, quantity: number }>) => {
        const { itemId, quantity } = action.payload;
        const item = state.find(item => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
      },
      clearCart: () => initialState,
    },
  });

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;