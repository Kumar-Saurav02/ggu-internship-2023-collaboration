import React from "react";
import "./SidebarTeacher.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const SidebarTeacher = ({ role }) => {
  return (
    <div className="sidebar">
      <Link to="/teacherProfile">
        <p>
          <PeopleIcon />
          Profile
        </p>
      </Link>
      <Link to="/attendanceEntry">
        <p>
          <PeopleIcon />
          Attendance Entry
        </p>
      </Link>
      {/* {role === "hod" && ( */}
        <Link to="/hod/createSubject">
          <p>
            <PeopleIcon />
            Create Subject
          </p>
        </Link>
        <Link to="/hod/createCourse">
          <p>
            <PeopleIcon />
            Create Course
          </p>
        </Link>
      
      {/* )} */}
      {/* {role === "classIncharge" && ( */}
      
        <Link to="/classIncharge/courseApproval">
          <p>
            <PeopleIcon />
            Course Approval
          </p>
        </Link>
        <Link to="/classIncharge/scholarshipApproval">
          <p>
            <PeopleIcon />
            Scholarship Approval
          </p>
        </Link>
      
      {/* )} */}
    </div>
  );
};

export default SidebarTeacher;
