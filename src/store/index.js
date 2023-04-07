import { configureStore } from "@reduxjs/toolkit";
import { repeatsReducer } from "./slices/fastRepeatsSlice";
import { coursesReducer } from "./slices/allCoursesSlice";
import { lessonsReducer } from "./slices/allLessonsSlice";

const store = configureStore({
  reducer: {
    repeats: repeatsReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
  }, // zbior wszystkich reducerów
});

export default store;
