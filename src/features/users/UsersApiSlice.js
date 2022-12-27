import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// import apiSlice for extending its endpoints and for updating the state
import { apiSlice } from "../../app/api/apiSlice";

// use entity adapter for updating the state
const usersAdapter = createEntityAdapter({});

// create an initial state
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this endpoint creates a query endpoint object (getUsers here) in api state
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        // verify there were no errors while fetching
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5, //secs
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          // add a id key to each user cause when we set state the redux will search for id field in each user to set up ids array
          user.id = user._id;
          return user;
        });
        // sets the state at getUsers query inside of api state with values as ids array and users entity(see at redux dev tools)
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        // if the query getUsers has ids array in the state then tag all
        if (result?.ids) {
          return [
            { type: "User", id: "List" }, //tags or caches users entity
            ...results.ids.map((id) => ({ type: "User", id })), //caches ids array
          ];
        } else
          return [
            { type: "User", id: "List" }, //tags or caches users entity only
          ];
      },
    }),
  }),
});

// export the query so that we can trigger that from outside
export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(); //select getUsers endpoint in the state
// NOTE - The state should have been created for any return of data from these endpoints
const selectUsersData = createSelector(
  selectUsersResult, // The output of the function will be the getUsers endpoint state inside of queries.
  (usersResult) => usersResult.data //output function that returns normalised state of getUsers query endpoint(ids and entities)
);

// read data from the state via adapter which uses selectUsersData selector for getting data
export const {
  selectAll: selectAllUsers, //returns all users in entity
  selectById: selectUserById, // return user by id from entity
  selectIds: selectUserIds, //return ids
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
