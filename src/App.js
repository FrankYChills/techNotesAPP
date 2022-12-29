import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Provide Layout as the parent of all components */}
        <Route path="/" element={<Layout />}>
          {/* home page of "/" */}
          <Route index element={<Public />} />
          {/* path - /login */}
          <Route path="login" element={<Login />} />
          {/* path - /dash */}
          <Route path="dash" element={<DashLayout />}>
            {/* homepage of /dash */}
            <Route index element={<Welcome />} />
            {/* path - /dash/notes */}
            <Route path="notes">
              {/* homepage of /dash/notes */}
              <Route index element={<NotesList />} />
              {/* path - /dash/notes/id */}
              <Route path=":id" element={<EditNote />} />
              {/* path - /dash/notes/new */}
              <Route path="new" element={<NewNote />} />
            </Route>
            {/* path - /dash/users */}
            <Route path="users">
              {/* homepage of /dash/users */}
              <Route index element={<UsersList />} />
              {/* path - /dash/users/id */}
              <Route path=":id" element={<EditUser />} />
              {/* path - /dash/user/new */}
              <Route path="new" element={<NewUserForm />} />
            </Route>
          </Route>
          {/* end of /dash */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
