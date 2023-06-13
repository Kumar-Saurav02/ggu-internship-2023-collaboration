import React from "react";
import "./SidebarTeacher.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const SidebarTeacher = ({ role }) => {
  return (
    <div className="studentSidebar">
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
      <Link to="/marksEntry">
        <p>
          <PeopleIcon />
          Marks Entry
        </p>
      </Link>
      {role === "hod" && (
        <div>
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
        </div>
      )}
      {role === "classIncharge" && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default SidebarTeacher;
