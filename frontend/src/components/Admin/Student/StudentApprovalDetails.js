import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const StudentApprovalDetails = () => {
  const { state } = useLocation();
  console.log(state.dateOfBirth.split("T")[0]);
  return (
    <Fragment>
      <Sidebar />
      <div>
        <div>
          <h3>Enrollment Number: </h3>
          <p>{state.enrollmentNo}</p>
        </div>
        <div>
          <h3>Name: </h3>
          <p>{state.name}</p>
        </div>
        <div>
          <h3>Roll Number: </h3>
          <p>{state.rollNo}</p>
        </div>
        <div>
          <h3>Father's Name: </h3>
          <p>{state.fatherName}</p>
        </div>
        <div>
          <h3>Mother's Name: </h3>
          <p>{state.motherName}</p>
        </div>
        <div>
          <h3>Current Semester: </h3>
          <p>{state.currentSemester}</p>
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
          <h3>Father's Mobile Number: </h3>
          <p>{state.fatherMobileNumber}</p>
        </div>
        <div>
          <h3>Mother's Mobile Number: </h3>
          <p>{state.motherMobileNumber}</p>
        </div>
        <div>
          <h3>Gender: </h3>
          <p>{state.gender}</p>
        </div>
        <div>
          <h3>Date Of Birth: </h3>
          <p>{state.dateOfBirth.split("T")[0]}</p>
        </div>
        <div>
          <h3>Date Of Joining: </h3>
          <p>{state.dateOfJoining.split("T")[0]}</p>
        </div>
        <div>
          <h3>Religion: </h3>
          <p>{state.religion}</p>
        </div>
        <div>
          <h3>Blood Group: </h3>
          <p>{state.bloodGroup}</p>
        </div>
        <div>
          <h3>Category: </h3>
          <p>{state.category}</p>
        </div>
        <div>
          <h3>Physically Handicapped: </h3>
          <p>{state.physicallyHandicapped}</p>
        </div>
        <div>
          <h3>Aadhar Number: </h3>
          <p>{state.aadharNumber}</p>
        </div>
        <div>
          <h3>Hosteler: </h3>
          <p>{state.hosteler}</p>
        </div>
        <div>
          <h3>Local Address: </h3>
          <div>
            <h3>Address: </h3>
            <p>{state.localAddress.address}</p>
          </div>
          <div>
            <h3>State: </h3>
            <p>{state.localAddress.state}</p>
          </div>
          <div>
            <h3>Pin Code: </h3>
            <p>{state.localAddress.pinCode}</p>
          </div>
        </div>
        <div>
          <h3>Permanent Address: </h3>
          <div>
            <h3>Address: </h3>
            <p>{state.permanentAddress.address}</p>
          </div>
          <div>
            <h3>State: </h3>
            <p>{state.permanentAddress.state}</p>
          </div>
          <div>
            <h3>Pin Code: </h3>
            <p>{state.permanentAddress.pinCode}</p>
          </div>
        </div>
        <div>
          <h3>Profile Photo: </h3>
          <img src={state.photoUpload.url} />
        </div>
        <div>
          <h3>Signature: </h3>
          <img src={state.signatureUpload.url} />
        </div>
        <div>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentApprovalDetails;
