import React from "react";
import "../../style/burgerSidebar.css";

const Navbar = ({ toggle, toggleClass }) => {
  let burgerClass = toggleClass ? "burger change" : "burger";

  return (
    <nav>
      <div onClick={() => toggle()} className={burgerClass}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <ul>
        <li>
          <a href="#!">ME</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
