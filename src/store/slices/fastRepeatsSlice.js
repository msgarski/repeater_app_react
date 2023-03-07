import { createSlice } from "@reduxjs/toolkit";

const fastRepeatsSlice = createSlice({
  name: "repeats",
  initialState: [],
  reducers: {
    addListCoursesWithRepeats: (state, action) => {
      state.length = 0;
      action.payload.forEach((el, i, a) => state.push(el));
    },
  },
});

export const { addListCoursesWithRepeats } = fastRepeatsSlice.actions;
export const repeatsReducer = fastRepeatsSlice.reducer;
