import { configureStore } from "@reduxjs/toolkit";
import { repeatsReducer } from "./slices/fastRepeatsSlice";

const store = configureStore({
  reducer: {
    repeats: repeatsReducer,
  }, // zbior wszystkich reducerów
});

export default store;
