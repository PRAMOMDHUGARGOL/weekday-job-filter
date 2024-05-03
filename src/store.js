import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./Features/Jobs";

export const store = configureStore({
  reducer: { jobs: jobsReducer },
});
