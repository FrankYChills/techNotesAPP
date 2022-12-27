import { Outlet } from "react-router-dom";
// The Layout is the parent component of all.
// This will be present in all of the components only Outlet component will be changed according to the route
const Layout = () => {
  return <Outlet />;
};

export default Layout;
