import { createSlice } from "@reduxjs/toolkit";

const allLessonsSlice = createSlice({
  name: "lessons",
  initialState: [],
  reducers: {
    addAllUserLessons: (state, action) => {
      state.length = 0;
      action.payload.forEach((el, i, a) => state.push(el));
    },
  },
});

export const { addAllUserLessons } = allLessonsSlice.actions;
export const lessonsReducer = allLessonsSlice.reducer;
