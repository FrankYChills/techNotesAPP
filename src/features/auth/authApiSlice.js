// extend apiSlice here
import { apiSlice } from "../../app/api/apiSlice";

// import logout action from authSlice
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      // take credentials as arg
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    // endpoint calling logOut
    sendLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      //   rtk special function to check whether the endpoint query has fulfilled and if what to do
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Response from the server: ", data);
          // call logout action in the state
          dispatch(logOut());
          // after logging out clear all of the local state
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

// export endpoints
export const { useLoginMutation, useRefreshMutation, useSendLogOutMutation } =
  authApiSlice;
