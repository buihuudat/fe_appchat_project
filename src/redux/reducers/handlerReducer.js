import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googlseStatus: false,
  addChat: false,
  n1: {
    status: false,
    data: {},
  },
  nn: {},
  openProfile: false,
};

export const handlerReducer = createSlice({
  name: "handler",
  initialState,
  reducers: {
    setGoogleLogin: (state, action) => {
      state.googlseStatus = action.payload;
    },
    setAddChat: (state, action) => {
      state.addChat = action.payload;
    },
    set1n: (state, action) => {
      state.n1 = action.payload;
    },
    setProfile: (state, action) => {
      state.openProfile = action.payload;
    },
  },
});

export const { setGoogleLogin, setAddChat, set1n, setProfile } =
  handlerReducer.actions;
export default handlerReducer.reducer;
