import React, { Fragment } from "react";
import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import "./ProfileTeacher.css";

const ProfileTeacher = () => {
  return (
    <Fragment>
      <div className="profileTeacher">
        <SidebarTeacher />
        <div>Data to be displayed</div>
      </div>
    </Fragment>
  );
};

export default ProfileTeacher;
