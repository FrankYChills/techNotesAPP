import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { store } from "../../app/store";
import { notesApiSlice } from "../notes/NotesApiSlice";
import { usersApiSlice } from "../users/UsersApiSlice";

const PreFetch = () => {
  useEffect(() => {
    // console.log("subscribing");
    // using store we can call any of the apiSlice endpoints and subscribe to them
    // as soon as we subscribe the state gets updated
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // this is a manual subscription and it will remain until the page on which this component is mounted is left and then it will auto unsub that
    return () => {
      // console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default PreFetch;
