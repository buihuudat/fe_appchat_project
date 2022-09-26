import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMessage } = messageReducer.actions;
export default messageReducer.reducer;
