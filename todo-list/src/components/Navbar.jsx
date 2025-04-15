import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <span>■ Your-Task</span>
      </div>
      <div className="list">
        <ul>
          <li>Home </li>
          <li>Your Task</li>
          <li>Help</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
