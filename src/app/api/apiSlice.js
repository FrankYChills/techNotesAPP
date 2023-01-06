// apiSlice manages how data will be fetched and how api state will be updated
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  // backend api address
  baseUrl: "https://techNotes-services.onrender.com",
  credentials: "include", //allow cache to send
  prepareHeaders: (headers, { getState }) => {
    // send header to the server
    const token = getState().auth.token; //gets the token from auth state
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  // call the baseQuery defines initially without any change
  let result = await baseQuery(args, api, extraOptions);

  // if theres an error that means in above query our access token has expired
  if (result?.error?.status === 403) {
    // console.log("Access Token got expired! Sending Refresh token ...");
    // call refresh endpoint
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    // new access token will be inside data attribute
    if (refreshResult?.data) {
      // update the state with new access token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // now retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if we don't get any data back probably our refresh token would have also been expired.So we need to login again
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message =
          "Refresh Token Expired | Login Expired | Login Again";
      }
      return refreshResult;
    }
  }
  // if our access token hasn't excpired return result
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
