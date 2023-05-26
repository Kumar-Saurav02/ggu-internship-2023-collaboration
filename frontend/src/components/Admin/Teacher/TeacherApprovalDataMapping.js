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
      <div className="content">
        <div className="key">{key}</div>

        <div className="label">
          <div className="field">Name </div>
          <div className="field">Employee ID</div>
          <div className="field">Department </div>
          <div className="field">Email </div>
        </div>

        <div className="briefinfo">
          {/* ek choot gaya hai tutu that is department ka field back end me hi nai hai*/}
          <div className="field">{data.name} </div>
          <div className="field">{data.employeeID} </div>
          {/* <div className="field">{data.fatherName} </div>  this is for the department*/}
          <div className="field">{data.email} </div>
        </div>

        <div className="btn">
          <button class="signInbtn border hover">Reject</button>
          <button class="signInbtn border hover">Accept</button>
          <button
            className="signInbtn border hover"
            onClick={openTeacherDetails}>
            Details
          </button>
        </div>
      </div>

      {/* <div>
        <p>{key}</p>
        <p> emp id{data.employeeID}</p>
        <p> naem {data.name}</p>
        <button onClick={openTeacherDetails}>Details</button>
        <button>Accept</button>
        <button>Reject</button>
      </div> */}
    </Fragment>
  );
};

export default TeacherApprovalDataMapping;
