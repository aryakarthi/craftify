import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "isModalOpen",
  initialState: false,
  reducers: {
    openModal: (state) => {
      return true;
    },
    closeModal: (state) => {
      return false;
    },
    getModalState: (state) => {
      return state;
    },
  },
});

export const { openModal, closeModal, getModalState } = modalSlice.actions;

export default modalSlice.reducer;
