import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "favSlice",
  initialState: null,
  reducers: {
    setFavItems: (state, action) => {
      return action.payload;
    },
    getFavItems: (state) => {
      return state;
    },
    clearFavItems: (state) => {
      return null;
    },
  },
});

export const { setFavItems, getFavItems, clearFavItems } =
favSlice.actions;

export default favSlice.reducer;