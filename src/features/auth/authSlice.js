// this is a slice of app's state or a feature of app(counter named here) whose state is managed individually but is available globally through store
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  // name of the state
  name: "auth",
  initialState: { token: null },
  reducers: {
    // actions to change state
    setCredentials: (state, action) => {
      // action.payload is the data passed to the function
      const { accessToken } = action.payload;
      // set an attribute named token in the auth slice
      state.token = accessToken;
    },
    logOut: (state, action) => {
      // set token to null
      state.token = null;
    },
  },
});

// export these so we can change state from outside of here
export const { setCredentials, logOut } = authSlice.actions;
// export reducer for store
export default authSlice.reducer;
// get data from auth state
export const selectCurrentToken = (state) => state.auth.token;
