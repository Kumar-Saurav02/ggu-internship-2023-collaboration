import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TeacherApprovalDataMapping = ({ key, data }) => {
  const navigate = useNavigate();

  const openTeacherDetails = () => {
    navigate("/teacherApprovalDetails", {
      state: data,
    });
  };
  return (
    <Fragment>
      <div>
        <p>{key}</p>
        <p>{data.employeeID}</p>
        <p>{data.name}</p>
        <button onClick={openTeacherDetails}>Details</button>
        <button>Accept</button>
        <button>Reject</button>
      </div>
    </Fragment>
  );
};

export default TeacherApprovalDataMapping;
