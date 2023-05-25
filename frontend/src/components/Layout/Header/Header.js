import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <Fragment>
      <div className="navbar">
        <div className="logo"></div>
        <div className="links">
          <Link to="/">Login</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/register">Register</Link>
          {/* <Link to="/about">About</Link> */}
        </div>
      </div>
    </Fragment>
  );
}