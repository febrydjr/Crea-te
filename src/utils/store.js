import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./AuthReducer";

export const store = configureStore({
  reducer: {
    authreducer: authreducer,
  },
});
