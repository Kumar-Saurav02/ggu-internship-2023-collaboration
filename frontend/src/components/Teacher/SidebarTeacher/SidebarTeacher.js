import React from "react";
import "./SidebarTeacher.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const SidebarTeacher = () => {
  return (
    <div className="studentSidebar">
      <Link to="/teacherProfile">
        <p>
          <PeopleIcon />
          Profile
        </p>
      </Link>
      <Link to="">
        <p>
          <PeopleIcon />
          Documents Upload
        </p>
      </Link>
      <Link to="">
        <p>
          <PeopleIcon />
          Course Selection
        </p>
      </Link>
      <Link to="">
        <p>
          <PeopleIcon />
          Scholarship
        </p>
      </Link>
    </div>
  );
};

export default SidebarTeacher;
