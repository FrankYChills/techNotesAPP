import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  // get username and status from custom hook
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
        style={{ paddingBottom: "7px" }}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>User : {username} </p>
      <p>Status : {status} </p>
    </footer>
  );
  return content;
};

export default DashFooter;
