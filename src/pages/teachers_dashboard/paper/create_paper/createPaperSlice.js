import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  paperDetails: null,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    goNext: (state) => {
      if (state.step < 5) {
        state.step += 1;
      }
    },
    goPrev: (state) => {
      if (state.step > 0) {
        state.step -= 1;
      }
    },
    setPaperDetails: (state, action) => {
      state.paperDetails = action.payload;
    },
  },
});

export const { goNext, goPrev, setPaperDetails } = stepSlice.actions;
export default stepSlice.reducer;
