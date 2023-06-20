import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";


const Sidebar = () => {
  return (
    
    <div className="sidebar">
      <Link to="/studentsApproval">
        <p>
          <PeopleIcon />
          Students Approval
        </p>
      </Link>
      <Link to="/teachersApproval">
        <p>
          <PeopleIcon /> Teachers Approval
        </p>
      </Link>
      <Link to="/HODApproval">
        <p>
          <PeopleIcon />
          HOD Approval
        </p>
      </Link>
      <Link to="/updateTeacherRole">
        <p>
          <PeopleIcon />
          Teacher Role
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
