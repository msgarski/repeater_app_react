import { createSlice } from "@reduxjs/toolkit";

const allCoursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addListUserCoursesWithFullInfo: (state, action) => {
      state.length = 0;
      //   state.push(action.payload);
      action.payload.forEach((el, i, a) => state.push(el));
    },
  },
});

export const { addListUserCoursesWithFullInfo } = allCoursesSlice.actions;
export const coursesReducer = allCoursesSlice.reducer;
