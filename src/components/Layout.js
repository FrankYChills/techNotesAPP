import { Outlet } from "react-router-dom";
// The Layout is the parent component of all.
// This will be present in all of the components only Outlet component will be changed according to the route
//
//IMP - if there is outlet is alone  at top level every component below its level will render as they are
// if oulet is b/w header and footer at top level other components will be in b/w header and footer
// if there is <p> like element other than outlet at top level only top level <p> will be rendered.Element below top level will not render
const Layout = () => {
  return <Outlet />;
};

export default Layout;
