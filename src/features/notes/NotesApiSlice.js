import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// import apiSlice for extending its endpoints and for updating the state
import { apiSlice } from "../../app/api/apiSlice";

// use entity adapter for creating and updating the state
// make entity adapter to sort fetched data at hand
const notesAdapter = createEntityAdapter({
  // 1 - to the right , 0 - nothing , -1 - to the left
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

// create an initial state
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this endpoint creates a query endpoint object (getNotes here) in api state
    getNotes: builder.query({
      query: () => "/notes",
      //   if method isn't specified default is "GET"
      validateStatus: (response, result) => {
        // verify there were no errors while fetching
        return response.status === 200 && !result.isError;
      },
      // cache data for a limited time
      keepUnusedDataFor: 5, //secs
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          // add a id key to each note cause when we set state the redux will search for id field in each note to set up ids array
          note.id = note._id;
          return note;
        });
        // sets the state at getNotes query inside of api state with different keys as data etc(see at redux dev tools)
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        // assume result is the data attribute in the query
        // if the query getNotes has ids array in the data attribute of state then tag/cache all
        if (result?.ids) {
          return [
            { type: "Note", id: "List" }, //tags or caches users entity
            ...result.ids.map((id) => ({ type: "Note", id })), //caches ids array
          ];
        } else
          return [
            { type: "Note", id: "List" }, //tags or caches users entity only
          ];
      },
    }),
  }),
});

// export the query so that we can trigger that from outside
export const { useGetNotesQuery } = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select(); //select getNotes endpoint in the state
// NOTE - The state should have been created for any return of data from these endpoints
// a memoized selector
const selectNotesData = createSelector(
  selectNotesResult, // triggers this function | The return of the function will be the getNotes endpoint state inside of queries.Passes return as an input to next function
  (notesResult) => notesResult.data //returns normalised state(data attribute only from the input) of getNotes query endpoint(ids and entities)
);

// read data from the state via adapter which uses selectNotesData selector for getting data
export const {
  selectAll: selectAllNotes, //returns all users in entity
  selectById: selectNoteById, // return user by id from entity
  selectIds: selectNotesIds, //return ids array
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
