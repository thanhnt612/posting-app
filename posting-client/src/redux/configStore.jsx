import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducer/taskReducer";

export const store = configureStore({
  reducer: {
    taskReducer
  },
});
