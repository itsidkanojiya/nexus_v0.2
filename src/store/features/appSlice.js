import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isLogin = true;
    },
  },
});

export const { setLogin } = appSlice.actions;
export default appSlice.reducer;
