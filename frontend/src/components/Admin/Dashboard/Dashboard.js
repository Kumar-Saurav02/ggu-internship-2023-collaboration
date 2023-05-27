import React, { Fragment } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        
          <h2>Dashboard</h2>
        
      </div>
    </Fragment>
  );
};

export default Dashboard;
