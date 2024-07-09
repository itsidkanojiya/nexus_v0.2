import { createSlice } from "@reduxjs/toolkit";
import { FaS } from "react-icons/fa6";

const initialState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    },
  },
});
