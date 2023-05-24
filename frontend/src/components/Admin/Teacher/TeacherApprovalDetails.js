import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const TeacherApprovalDetails = () => {
  const { state } = useLocation();
  return (
    <Fragment>
      <Sidebar />
      <div>
        <div>
          <h3>Employee ID: </h3>
          <p>{state.employeeID}</p>
        </div>
        <div>
          <h3>Name: </h3>
          <p>{state.name}</p>
        </div>
        <div>
          <h3>Email: </h3>
          <p>{state.email}</p>
        </div>
        <div>
          <h3>Mobile Number: </h3>
          <p>{state.mobileNumber}</p>
        </div>
        <div>
          <h3>Gender: </h3>
          <p>{state.gender}</p>
        </div>
        <div>
          <h3>Department: </h3>
          <p>{state.department}</p>
        </div>
        <div>
          <h3>Designation: </h3>
          <p>{state.designation}</p>
        </div>
        <div>
          <h3>Date Of Birth: </h3>
          <p>{state.dateOfBirth.split("T")[0]}</p>
        </div>
        <div>
          <h3>Assigned Subjects</h3>
          {state.assignSubject &&
            state.assignSubject.map((subject) => (
              <div>
                <h3>Subject: </h3>
                <p>{subject}</p>
              </div>
            ))}
        </div>
        <div>
          <h3>Profile Photo: </h3>
          <img src={state.profilePhoto.url} />
        </div>
        <div>
          <h3>Signature: </h3>
          <img src={state.signature.url} />
        </div>
        <div>
          <h3>Resume: </h3>
          <object data={state.resume.url}>Resume</object>
          <a target="_blank" rel="noreferrer" href={state.resume.url}>
            Download Resume
          </a>
        </div>
        <div>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherApprovalDetails;
