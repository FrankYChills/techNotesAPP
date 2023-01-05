import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

//state gets vanished when user refreshes the page
// persist the state when user is logged in and he refreshes the page
// we need to hit the refresh endpoint so that we can get a new access token via refresh token which is stored in the cache
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { selectCurrentToken } from "./authSlice";

import React from "react";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("Verifying Refresh Token ...");
      try {
        // when this component mounts(initally and on refresh) trigger refresh mutation
        await refresh();
        console.log("getting access token again");
        setTrueSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };
    // only if user has set persist to true and he refreshes(no token in auth state)
    if (!token && persist) {
      verifyRefreshToken();
    }
  }, [persist, refresh, token]);

  let content;
  if (!persist) {
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("getting access token");
    // here we are returning a <p> element not an outlet so no other component below this comp level will get rendered
    content = <PulseLoader color={"#fff"} />;
  } else if (isError) {
    console.log("error while refreshing and getting token back");
    content = (
      <p className="errmsg">
        {error?.data?.message}
        <Link to="/login">&nbsp; Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("Success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and unint");
    console.log("Uninitialized");
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
