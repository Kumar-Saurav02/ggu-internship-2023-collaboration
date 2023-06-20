import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, subRole, Component }) => {
  const { teacher, isAuthenticated: teacherAuthentication } = useSelector(
    (state) => state.registerLoginTeachers
  );

  const { student, isAuthenticated: studentAuthentication } = useSelector(
    (state) => state.registerLoginStudents
  );

  return (
    <>
      {!teacherAuthentication && !studentAuthentication ? (
        <Navigate to="/" />
      ) : (role === "teacher" &&
          subRole === "admin" &&
          teacher.role === "teacher" &&
          teacher.subRole === "admin") ||
        (role === "teacher" && subRole === "" && teacher.role === "teacher") ||
        (role === "teacher" &&
          subRole === "hod" &&
          teacher.role === "teacher" &&
          teacher.subRole === "hod") ||
        (role === "teacher" &&
          subRole === "classIncharge" &&
          teacher.role === "teacher" &&
          teacher.subRole === "classIncharge") ||
        (role === "student" && subRole === "" && student.role === "student") ? (
        <Component />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
