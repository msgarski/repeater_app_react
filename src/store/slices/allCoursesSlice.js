import { createSlice } from "@reduxjs/toolkit";

const allCoursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addListOfAllCourses: (state, action) => {
      state.length = 0;
      //   action.payload.forEach((el, i, a) => state.push(el));
      state.push(action.payload);
    },
  },
});

export const addListOfAllCourses = allCoursesSlice.actions;
export const coursesReducer = allCoursesSlice.reducer;
