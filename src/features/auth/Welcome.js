import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p style={{ margin: "10px" }}>{today}</p>
      <h1 style={{ marginLeft: "10px" }}>Welcome!</h1>
      <p style={{ marginLeft: "10px" }}>
        <Link to="/dash/notes"> View techNotes</Link>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <Link to="/dash/users"> View User Settings </Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
