import { createSlice } from "@reduxjs/toolkit";

const fastRepeatsSlice = createSlice({
  name: "repeats",
  initialState: [],
  reducers: {
    addListCoursesWithRepeatsNums: (state, action) => {
      state.length = 0;
      action.payload.forEach((el, i, a) => state.push(el));
    },
  },
});

export const { addListCoursesWithRepeatsNums } = fastRepeatsSlice.actions;
export const repeatsReducer = fastRepeatsSlice.reducer;
