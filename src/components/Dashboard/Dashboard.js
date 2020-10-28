import React, { Fragment, useState, useEffect } from "react";

import "../../style/dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import useWindowDimensions from "../utils/useWindowDimensions";

const Dashboard = (props) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const toggleSide = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const { width } = useWindowDimensions();
  useEffect(() => {
    // console.log(width);
    if (toggleSidebar) {
      if (width < 700) {
        setToggleSidebar(false);
      }
    } else {
      if (width >= 700) {
        setToggleSidebar(true);
      }
    }
    // eslint-disable-next-line
  }, [width]);

  return (
    <Fragment>
      {toggleSidebar && <Sidebar />}
      <div className="main">
        <Navbar toggle={() => toggleSide()} toggleClass={toggleSidebar} />

        {props.children ? (
          <div className="content">{props.children}</div>
        ) : (
          <h3>DASHBOARD</h3>
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
