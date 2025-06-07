// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalAmount += action.payload.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        state.totalAmount -= state.items[existingIndex].price;
        state.items.splice(existingIndex, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
