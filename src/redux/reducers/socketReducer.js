import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const socketReducer = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSocket } = socketReducer.actions;
export default socketReducer.reducer;
