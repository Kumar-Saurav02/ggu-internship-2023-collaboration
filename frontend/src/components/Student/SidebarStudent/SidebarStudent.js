import React from "react";
import "./SidebarStudent.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import PeopleIcon from "@mui/icons-material/People";
import { useDispatch } from "react-redux";

const SidebarStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutStudent());
    navigate("/");
  };

  return (
    <div className="studentSidebar">
      <Link to="/studentProfile">
        <p>
          <PeopleIcon />
          Profile
        </p>
      </Link>
      <Link to="/studentDocumentUpload">
        <p>
          <PeopleIcon />
          Documents Upload
        </p>
      </Link>
      <Link to="/studentCourseSelection">
        <p>
          <PeopleIcon />
          Course Selection
        </p>
      </Link>
      <Link to="/studentScholarship">
        <p>
          <PeopleIcon />
          Scholarship
        </p>
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default SidebarStudent;
