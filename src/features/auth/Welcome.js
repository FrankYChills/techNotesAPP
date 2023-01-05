import { Link } from "react-router-dom";
import { useEffect } from "react";

import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  useEffect(() => {
    document.title = "Home | techNotes";
  });

  // get user data using auth hook
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  console.log(date);
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p style={{ margin: "10px" }}>{today}</p>
      <h1 style={{ marginLeft: "10px" }}>Welcome {username}!</h1>
      <p style={{ marginLeft: "10px" }}>
        <Link to="/dash/notes"> View techNotes</Link>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <Link to="/dash/notes/new">Add New techNotes</Link>
      </p>
      {(isAdmin || isManager) && (
        <p style={{ marginLeft: "10px" }}>
          <Link to="/dash/users"> View User Settings </Link>
        </p>
      )}
      {(isAdmin || isManager) && (
        <p style={{ marginLeft: "10px" }}>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );
  return content;
};

export default Welcome;
