import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setAllProducts(state, action) {
      return action.payload;
    },
    getAllProducts(state) {
      return state;
    },
  },
});

export const { setAllProducts, getAllProducts } = productSlice.actions;

export default productSlice.reducer;
