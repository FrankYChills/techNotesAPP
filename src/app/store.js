// this file sets the global state for the app
import { configureStore } from "@reduxjs/toolkit";
// setup listemers for refetching the data
// we are refetching data cause someone can update the data via postman etc without triggering endpoints that clears cache
import { setupListeners } from "@reduxjs/toolkit/dist/query";

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
// allow listeners to access the store
setupListeners(store.dispatch);
