import { configureStore } from "@reduxjs/toolkit";
import AppState from "./appSlice";
export const store = configureStore({
  reducer: {
    AppState,
  },
});
