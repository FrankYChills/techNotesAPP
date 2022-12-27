// this file sets the global state for the app
import { configureStore } from "@reduxjs/toolkit";

// import the Api reducer
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    // sets the state of api as "api" according to its reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
