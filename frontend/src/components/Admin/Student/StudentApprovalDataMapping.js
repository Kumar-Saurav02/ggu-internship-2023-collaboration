import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentApprovalDataMapping = ({ key, data }) => {
  const navigate = useNavigate();

  const openStudentDetails = () => {
    navigate("/studentApprovalDetails", {
      state: data,
    });
  };
  return (
    <Fragment>
      <div>
        <p>{key}</p>
        <p>{data.enrollmentNo}</p>
        <p>{data.name}</p>
        <p>{data.currentSemester}</p>
        <button onClick={openStudentDetails}>Details</button>
        <button>Accept</button>
        <button>Reject</button>
      </div>
    </Fragment>
  );
};

export default StudentApprovalDataMapping;
