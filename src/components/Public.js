import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">techNotes Services</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Chicago City, techNotes services provide
          a trained team ready to meet your tech needs.We specialize in both
          hardware and software repairements.If your system can be repaired at
          your home , we provide you on-site services. We have thousands of
          satisfied and loyal customers who trust on techNotes for any of their
          tech needs.
        </p>
        <br />
        <p>
          We provide services at the budget friendly cost.Connect with us now to
          know more.
        </p>
        <br />
        <address className="public__addr">
          techNotes Services
          <br />
          555 Marine drive
          <br />
          Chicago City, Illinois 1100
          <br />
          <a href="tel:+15134412888">(151) 34412888</a>
        </address>
        <br />
        <p>Owner: Dan Davidson </p>
        <br />
        <a className="quote" href="mailto:email@email.de">
          Get a Quote
        </a>
        <Link to="/login" className="emp-login">
          Employee Login
        </Link>
      </main>
      <br />

      <footer></footer>
    </section>
  );
  return content;
};

export default Public;
