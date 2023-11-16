import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: null,
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
    getAllUsers(state) {
      return state;
    },
  },
});

export const { setAllUsers, getAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;
