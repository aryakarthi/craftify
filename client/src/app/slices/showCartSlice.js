import { createSlice } from "@reduxjs/toolkit";

export const showCartSlice = createSlice({
  name: "showCart",
  initialState: false,
  reducers: {
    setCartOn: (state) => {
      return true;
    },
    setCartOff: (state) => {
      return false;
    },
    getCartDisplayState: (state) => {
      return state;
    },
  },
});

export const { setCartOn, setCartOff, getCartDisplayState } =
  showCartSlice.actions;

export default showCartSlice.reducer;