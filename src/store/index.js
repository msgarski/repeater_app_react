import { configureStore } from "@reduxjs/toolkit";
import { repeatsReducer } from "./slices/fastRepeatsSlice";
import { coursesReducer } from "./slices/allCoursesSlice";

const store = configureStore({
  reducer: {
    repeats: repeatsReducer,
    courses: coursesReducer,
  }, // zbior wszystkich reducerów
});

export default store;
