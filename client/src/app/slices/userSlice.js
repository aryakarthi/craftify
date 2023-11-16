import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserDetails: (state, action) => {
      return action.payload;
    },
    getUserDetails: (state) => {
      return state;
    },
    setUserNull: (state) => {
      return null;
    },
  },
});

export const { setUserDetails, getUserDetails, setUserNull } =
  userSlice.actions;

export default userSlice.reducer;
