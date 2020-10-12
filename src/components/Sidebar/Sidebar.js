import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <div className="side-links">
        <div className="panel-group">
          <div className="panel-title">PAGES</div>
          <div className="links">
            <div className="link-group">
              <Link to="/dashboard/parts">Parts</Link>
              <span>></span>
            </div>
            <div className="link-group">
              <Link to="#!">Accesories</Link>
              <span>></span>
            </div>
          </div>
        </div>
      </div>
      <div className="side-links">
        <div className="panel-group">
          <div className="panel-title">Settings</div>
          <div className="links">
            <div className="link-group">
              <Link to="#!">Edit</Link>
              <span>></span>
            </div>
            <div className="link-group">
              <Link to="#!">Me</Link>
              <span>></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
