import { React, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logoutTeacher } from "../../../actions/teacherAction";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutKroStudent = () => {
    dispatch(logoutStudent());
    navigate("/");
  };
  const logoutKroTeacher = () => {
    dispatch(logoutTeacher());
    navigate("/");
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
