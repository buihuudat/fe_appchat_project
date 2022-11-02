import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteAccount: {
    status: false,
  },
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setDeleteAccount: (state, action) => {
      state.deleteAccount = action.payload;
    },
  },
});

export const { setDeleteAccount } = modalReducer.actions;
export default modalReducer.reducer;
