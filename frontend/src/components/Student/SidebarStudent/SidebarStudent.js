import React from "react";
import "./SidebarStudent.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const SidebarStudent = () => {
  return (
    <div className="sidebar">
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
    </div>
  );
};

export default SidebarStudent;
