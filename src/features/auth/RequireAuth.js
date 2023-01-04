import { Outlet, useLocation, Navigate } from "react-router-dom";

// custom auth hook
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  console.log("user roles", roles);
  console.log("allowed", allowedRoles);
  const content =
    // if sondition is true for any one of the role
    // if there is a role return normal outlet comp. to mount else return navigate component which sends user back to login page
    roles.some((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  return content;
};

export default RequireAuth;
