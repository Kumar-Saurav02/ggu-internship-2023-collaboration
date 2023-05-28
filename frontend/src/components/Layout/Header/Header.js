import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logoutTeacher } from "../../../actions/teacherAction";

export default function Header() {
  const dispatch = useDispatch();

  const logoutKroStudent = () => {
    dispatch(logoutStudent());
  };
  const logoutKroTeacher = () => {
    dispatch(logoutTeacher());
  };
  return (
    <Fragment>
      <div className="navbar">
        <div className="logo"></div>
        <div className="links">
          <Link to="/">Login</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/register">Register</Link>
          <button onClick={logoutKroStudent}>Logout Student</button>
          <button onClick={logoutKroTeacher}>Logout Teacher</button>
        </div>
      </div>
    </Fragment>
  );
}
