import { createSlice } from "@reduxjs/toolkit";

export const previewSlice = createSlice({
  name: "previewData",
  initialState: null,
  reducers: {
    setPreviewData: (state, action) => {
      return action.payload;
    },
    getPreviewData: (state) => {
      return state;
    },
    setPreviewNull: (state) => {
      return null;
    },
  },
});

export const { setPreviewData, getPreviewData, setPreviewNull } =
  previewSlice.actions;

export default previewSlice.reducer;
