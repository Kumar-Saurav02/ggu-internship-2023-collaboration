import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./TeacherApproval.css";
import {
  clearMessages,
  teacherApprovalRequestAccept,
  teacherApprovalRequestReject,
} from "../../../actions/adminAction";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Loader/Loader";

const TeacherApprovalDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(clearMessages());
      navigate("/teachersApproval");
    }
  }, [error, message, dispatch, navigate]);

  const acceptTeacherApproval = () => {
    dispatch(teacherApprovalRequestAccept(state._id));
  };

  const rejectTeacherApproval = () => {
    dispatch(teacherApprovalRequestReject(state._id));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <Sidebar />
            <div className="approvBox">
              <div className="subsection">
                <h2>Teacher's Details</h2>
                <hr></hr>
                <br></br>

                <div className="entry">
                  <label className="label_name">Employee ID</label>
                  <p>{state.employeeID}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Name</label>
                  <p>{state.name}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Email</label>
                  <p>{state.email}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Department</label>
                  <p>{state.department}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Designation</label>
                  <p>{state.designation}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Phone Number</label>
                  <p>{state.mobileNumber}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Gender</label>
                  <p>{state.gender}</p>
                </div>

                <div className="entry">
                  <label className="label_name">DoB</label>
                  <p>{state.dateOfBirth.split("T")[0]}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Assigned Subject</label>

                  <div className="address">
                    {state.assignSubject &&
                      state.assignSubject.map((subject) => (
                        <div>
                          <p>
                            <b>Subject:</b>
                          </p>
                          <p>{subject}</p>
                          <br></br>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="entry">
                  <label className="label_name">Resume</label>
                  <br></br>
                  <a target="_blank" rel="noreferrer" href={state.resume.url}>
                    View
                  </a>
                </div>
              </div>

              <div className="subsection">
                <div>
                  <h2>Photographs</h2>
                  <hr></hr>
                  <br></br>

                  <div className="entry">
                    <label className="label_name">Photo</label>
                    <img src={state.profilePhoto.url} alt="profile" />
                  </div>

                  <div className="entry">
                    <label className="label_name">Signature</label>
                    <img src={state.signature.url} alt="signature" />
                  </div>
                </div>
              </div>

              <div className="btnApproval">
                <button
                  onClick={rejectTeacherApproval}
                  className="signInbtn border hover">
                  Reject
                </button>
                <button
                  onClick={acceptTeacherApproval}
                  className="signInbtn border hover">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeacherApprovalDetails;
