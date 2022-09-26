import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
  allUser: {},
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { setUser, setAllUser } = userReducer.actions;
export default userReducer.reducer;
