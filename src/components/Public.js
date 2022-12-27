import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Chicago City, Dan D. repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <br />
        <address className="public__addr">
          Dan D. Repairs
          <br />
          555 Marine drive
          <br />
          Chicago City, Illinois 1100
          <br />
          <a href="tel:+15134412888">(151) 34412888</a>
        </address>
        <br />
        <p>Owner: Dan Davidson </p>
      </main>
      <br />
      <br />
      <footer>
        <Link to="/login" className="emp-login">
          Employee Login
        </Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
