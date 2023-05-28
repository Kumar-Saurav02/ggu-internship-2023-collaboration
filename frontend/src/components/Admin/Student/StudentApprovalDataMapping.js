import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  studentApprovalRequestAccept,
  studentApprovalRequestReject,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import Sidebar from "../Sidebar/Sidebar";
import "./StudentApproval.css";

const StudentApprovalDataMapping = ({ key, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.acceptingRejectingStudentTeacherApproval
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      navigate("/studentsApproval");
    }
  }, [error, message]);

  const acceptStudentApproval = () => {
    dispatch(studentApprovalRequestAccept(data._id));
  };

  const rejectStudentApproval = () => {
    dispatch(studentApprovalRequestReject(data._id));
  };

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
          <div className="field">Father's Name </div>
          <div className="field">Semester </div>
          <div className="field">Email </div>
        </div>

        <div className="briefinfo">
          <div className="field">{data.name} </div>
          <div className="field">{data.enrollmentNo} </div>
          <div className="field">{data.fatherName} </div>
          <div className="field">{data.currentSemester} </div>
          <div className="field">{data.email} </div>
        </div>

        <div className="btn">
          <button
            onClick={rejectStudentApproval}
            class="signInbtn border hover">
            Reject
          </button>
          <button
            onClick={acceptStudentApproval}
            class="signInbtn border hover">
            Accept
          </button>
          <button
            className="signInbtn border hover"
            onClick={openStudentDetails}>
            Details
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentApprovalDataMapping;
