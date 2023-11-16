import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: null,
  reducers: {
    setCartItems: (state, action) => {
      return action.payload;
    },
    getCartItems: (state) => {
      return state;
    },
    clearCartItems: (state) => {
      return null;
    },
  },
});

export const { setCartItems, getCartItems, clearCartItems } =
cartSlice.actions;

export default cartSlice.reducer;