import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

// import authSlice actions
import { setCredentials } from "./authSlice";
// import authApiSlice endpoint
import { useLoginMutation } from "./authApiSlice";

// import custom hook
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) {
    return <PulseLoader color={"#fff"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // we'll get access token after calling an endpoint
      const { accessToken } = await login({ username, password }).unwrap();
      // set the state with an access token so we can access protected routes
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      // after successfully logging in route to /dash
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("All Fields are required");
      } else if (err.status === 401) {
        setErrMsg("Invalid Password | UnAuthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };
  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p className={errClass} ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={() => setPersist((prev) => !prev)}
              checked={persist}
            />
            Trust this device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
