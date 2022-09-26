import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const groupReducer = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setGroup } = groupReducer.actions;
export default groupReducer.reducer;
