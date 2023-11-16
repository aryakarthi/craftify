import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggleSidebar",
  initialState: true,
  reducers: {
    toggle: (state) => !state,
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
