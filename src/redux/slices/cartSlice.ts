import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
    id: string,
    imageUrl: string,
    title: string,
    price: number,
    type: string,
    size: number,
    count: number,
}

interface CartSliceState {
  totalPrice: number,
  items: CartItem[],
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        if (findItem.count < 20) {
          findItem.count++;
        }
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((el) => +el.id !== +action.payload);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const deleteItem = state.items.find((el) => el.id === action.payload);
      
      if (deleteItem) {
          deleteItem.count--
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const {
  addItem, removeItem, clearItems, minusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
