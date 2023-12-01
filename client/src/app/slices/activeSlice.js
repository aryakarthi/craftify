import { createSlice } from "@reduxjs/toolkit";

export const activeSlice = createSlice({
  name: "active",
  initialState: "Home",
  reducers: {
    setActive(state, action) {
      return action.payload;
    },
    getActiveStatus(state) {
      return state;
    },
  },
});

export const { setActive, getActiveStatus } = activeSlice.actions;

export default activeSlice.reducer;
