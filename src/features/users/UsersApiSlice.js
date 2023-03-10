import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// import apiSlice for extending its endpoints and for updating the state
import { apiSlice } from "../../app/api/apiSlice";

// use entity adapter for creating and updating the state
const usersAdapter = createEntityAdapter({});

// create an initial state
const initialState = usersAdapter.getInitialState();
// extend apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this endpoint creates a query endpoint object (getUsers here) in api state
    getUsers: builder.query({
      // get data from /users
      //   if method isn't specified default is "GET"
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          // verify there were no errors while fetching
          return response.status === 200 && !result.isError;
        },
      }),

      //keep  subscribed to getUsers for 5 secs after user leaves this page
      // after unsub all the state will be lost
      // by default it will keep subscribed the endpoint for 60 secs
      // keepUnusedDataFor: 5, //secs
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          // add a id key to each user cause when we set state the redux will search for id field in each user to set up ids array
          user.id = user._id;
          return user;
        });
        // sets the state at getUsers query inside of api state with different keys as data etc(see at redux dev tools)
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        // assume result is the data attribute in the query
        // cache the state data
        // if the query getUsers has ids array in the state then tag all
        if (result?.ids) {
          return [
            { type: "User", id: "List" }, //tags or caches users entity
            ...result.ids.map((id) => ({ type: "User", id })), //caches each id in ids array
          ];
        } else
          return [
            { type: "User", id: "List" }, //tags or caches users entity only
          ];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        // post data to /users
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // clear entity cache
      invalidatesTags: [{ type: "User", id: "List" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        // patch data to /users
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      // clear cache of particular id in ids array and entity
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        // delete to /users
        method: "DELETE",
        body: {
          id,
        },
      }),
      // clear cache of particular id in ids array and entity
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

// export the query so that we can trigger that from outside
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(); //select getUsers endpoint in the state
// NOTE - The state should have been created for any return of data from these endpoints
// a memoized selector
const selectUsersData = createSelector(
  selectUsersResult, // triggers this function | The return of the function will be the getUsers endpoint state inside of queries.Passes return as an input to next function
  (usersResult) => usersResult.data //returns normalised state(data attribute only from the input) of getUsers query endpoint(ids and entities)
);

// read data from the state via adapter which uses selectUsersData selector for getting data
export const {
  selectAll: selectAllUsers, //returns all users in entity
  selectById: selectUserById, // return user by id from entity
  selectIds: selectUserIds, //return ids array
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
