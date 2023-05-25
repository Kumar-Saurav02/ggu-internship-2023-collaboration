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
      
      <div className="content">
            <div className="key">{key}</div>

            <div className="label">
              <div className="field">Name </div>
              <div className="field">Enrollment No </div>
              <div className="field">Fathe's Name </div>
              <div className="field">Semester </div>
              <div className="field">Email </div>
            </div>
          
            <div className="briefinfo">
                {/* ek choot gaya hai tutu that is department ka field back end me hi nai hai*/}
                <div className="field">{data.name} </div>
                <div className="field">{data.enrollmentNo} </div>
                <div className="field">{data.fatherName} </div>
                <div className="field">{data.currentSemester} </div>
                <div className="field">{data.email} </div>
            </div>
            
            <div className="btn">
                <button class="signInbtn border hover">Reject</button>
                <button class="signInbtn border hover">Accept</button>
                <button  className="signInbtn border hover" onClick={openStudentDetails}>Details</button>
                
            </div>
      </div>

    </Fragment>
  );
};

export default StudentApprovalDataMapping;
