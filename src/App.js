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
import PreFetch from "./features/auth/PreFetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

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
          {/* Protected Routes */}
          {/* persist login component fetches the access token again when user refreshes acc to conditions */}
          <Route element={<PersistLogin />}>
            {/* require auth checks if the user has any role and routes acc to it */}
            {/* in below comp. allow access if user has any of the roles*/}
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              {/* mount Prefetch as the parent component using Outlet to all routes below eg - /dash etc */}
              <Route element={<PreFetch />}>
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
                  {/* allow access for only users with role of admin  or manager */}
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Manager, ROLES.Admin]}
                      />
                    }
                  >
                    {/* path - /dash/users */}
                    <Route path="users">
                      {/* homepage of /dash/users */}
                      <Route index element={<UsersList />} />
                      {/* path - /dash/users/id */}
                      <Route path=":id" element={<EditUser />} />
                      {/* path - /dash/users/new */}
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>
                </Route>
                {/* end of /dash */}
              </Route>
              {/* end of PreFetch outlet */}
            </Route>
            {/* end of requireAUth */}
          </Route>
          {/* end of PersistLogin */}
          {/* end of protected routes */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
