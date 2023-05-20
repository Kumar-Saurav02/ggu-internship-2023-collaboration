import React, { Fragment } from "react";
import "./ProfileStudent.css";
import { useDispatch, useSelector } from "react-redux";

const ProfileStudent = () => {
  const dispatch = useDispatch();
  const { student, loading, isAuthenticated } = useSelector(
    (state) => state.registerLoginStudents
  );

  console.log(student);

  return <Fragment>ProfileStudent</Fragment>;
};

export default ProfileStudent;
