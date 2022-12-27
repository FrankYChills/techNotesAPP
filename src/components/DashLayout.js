import { Outlet } from "react-router-dom";
//This component is also a parent of all components

import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <div className="dash-container">
        <DashHeader />
        <Outlet />
        <DashFooter />
      </div>
    </>
  );
};

export default DashLayout;
