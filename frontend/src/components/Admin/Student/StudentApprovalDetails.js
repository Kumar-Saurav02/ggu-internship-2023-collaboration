import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearMessages,
  studentApprovalRequestAccept,
  studentApprovalRequestReject,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import "./StudentApproval.css";

const StudentApprovalDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const { loading, message, error } = useSelector(
    (state) => state.acceptingRejectingStudentTeacherApproval
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      navigate("/studentsApproval");
      dispatch(clearMessages());
    }
  }, [error, message, dispatch, navigate]);

  const acceptStudentApproval = () => {
    dispatch(studentApprovalRequestAccept(state._id));
  };

  const rejectStudentApproval = () => {
    dispatch(studentApprovalRequestReject(state._id));
  };

  return (

    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="studentDetails">
          <SidebarTeacher role={teacher.subRole} />
          <div className="approvBox">
            <div className="subsection">
              <h2>Student Details</h2>
              <hr></hr>
              <br></br>

              <div className="entry">
                <label className="label_name">Enrollement No.</label>
                <p>{state.enrollmentNo}</p>
              </div>

              <div className="entry">
                <label className="label_name">Name</label>
                <p>{state.name}</p>
              </div>

              <div className="entry">
                <label className="label_name">Roll Number</label>
                <p>{state.rollNo}</p>
              </div>

              <div className="entry">
                <label className="label_name">Aadhar Number</label>
                <p>{state.aadharNumber}</p>
              </div>

              <div className="entry">
                <label className="label_name">Father's Name</label>
                <p>{state.fatherName}</p>
              </div>

              <div className="entry">
                <label className="label_name">Mother's Name</label>
                <p>{state.motherName}</p>
              </div>

              {/* yahan branch name hoga and the department name 2 more field need to be added*/}
              <div className="entry">
                <label className="label_name">Current Semester</label>
                <p>{state.currentSemester}</p>
              </div>

              <div className="entry">
                <label className="label_name">Student Phone Number</label>
                <p>{state.mobileNumber}</p>
              </div>

              <div className="entry">
                <label className="label_name">Gender</label>
                <p>{state.gender}</p>
              </div>

              <div className="entry">
                <label className="label_name">Date of Birth</label>
                <p>{state.dateOfBirth.split("T")[0]}</p>
              </div>

              <div className="entry">
                <label className="label_name">Date of Joining</label>
                <p>{state.dateOfJoining.split("T")[0]}</p>
              </div>

              <div className="entry">
                <label className="label_name">Religion</label>
                <p>{state.religion}</p>
              </div>

              <div className="entry">
                <label className="label_name">Category</label>
                <p>{state.category}</p>
              </div>

              <div className="entry">
                <label className="label_name">Blood Group</label>
                <p>{state.bloodGroup}</p>
              </div>

              <div className="entry">
                <label className="label_name">Physically Handicapped</label>
                <p>{state.physicallyHandicapped}</p>
              </div>

              <div className="entry">
                <label className="label_name">Hosteler</label>
                <p>{state.hosteler}</p>
              </div>
            </div>

            <div className="subsection">
              <h2>Contact Details</h2>
              <hr></hr>
              <br></br>

              <div className="entry">
                <label className="label_name">Local Address</label>

                <div className="address">
                  <p>{state.localAddress.address}</p>
                  <br></br>
                  <p>{state.localAddress.state}</p>
                  <br></br>
                  <p>{state.localAddress.pinCode}</p>
                  <br></br>
                </div>
              </div>

              <div className="entry">
                <label className="label_name">Permanent Address</label>

                <div className="address">
                  <p>{state.permanentAddress.address}</p>
                  <br></br>
                  <p>{state.permanentAddress.state}</p>
                  <br></br>
                  <p>{state.permanentAddress.pinCode}</p>
                  <br></br>
                </div>
              </div>

              <div className="entry">
                <label className="label_name">Father Mobile Number</label>
                <p>{state.fatherMobileNumber}</p>
              </div>

              <div className="entry">
                <label className="label_name">Mother Mobile Number</label>
                <p>{state.motherMobileNumber}</p>
              </div>
            </div>

            <div className="subsection">
              <div>
                <h2>Photographs</h2>
                <hr></hr>
                <br></br>

                <div className="entry">
                  <label className="label_name">Photo</label>
                  <img src={state.photoUpload.url} alt="profile" />
                </div>

                <div className="entry">
                  <label className="label_name">Signature</label>
                  <img src={state.signatureUpload.url} alt="signature" />
                </div>
              </div>
            </div>

            <div className="btnApproval">
              <button 
                onClick={rejectStudentApproval}
                class="signInbtn border hover">Reject</button>
              <button 
                onClick={acceptStudentApproval}
                class="signInbtn border hover">Accept</button>
            </div>
          </div>
        </div>
      </Fragment>
    )}
    </Fragment>
  );
};

export default StudentApprovalDetails;
