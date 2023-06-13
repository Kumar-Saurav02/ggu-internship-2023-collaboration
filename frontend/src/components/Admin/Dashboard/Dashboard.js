import React, { Fragment } from "react";
import "./Dashboard.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  return (
    <Fragment>
      <div className="dashboard">
        <SidebarTeacher role={teacher.subRole} />
        <h2>Dashboard</h2>
      </div>
    </Fragment>
  );
};

export default Dashboard;
