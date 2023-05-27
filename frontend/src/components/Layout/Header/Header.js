import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import "./Header.css";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const logoutKro = () => {
    dispatch(logoutStudent());
  };
  return (
    <Fragment>
      <div className="navbar">
        <div className="logo"></div>
        <div className="links">
          <Link to="/">Login</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/register">Register</Link>
          <button onClick={logoutKro}>Logout</button>
        </div>
      </div>
    </Fragment>
  );
}
