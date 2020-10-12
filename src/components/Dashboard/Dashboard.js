import React, { Fragment } from "react";

import "../../style/dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Dashboard = (props) => {
  return (
    <Fragment>
      <Sidebar />
      <div className="main">
        <Navbar />

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
