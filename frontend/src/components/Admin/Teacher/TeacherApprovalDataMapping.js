import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearMessages,
  teacherApprovalRequestAccept,
  teacherApprovalRequestReject,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";

const TeacherApprovalDataMapping = ({ key, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(teacherApprovalRequestAccept(data._id));
  };

  const rejectTeacherApproval = () => {
    dispatch(teacherApprovalRequestReject(data._id));
  };

  const openTeacherDetails = () => {
    navigate("/teacherApprovalDetails", {
      state: data,
    });
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
              <div className="field">{data.name} </div>
              <div className="field">{data.employeeID} </div>
              <div className="field">{data.department} </div>
              <div className="field">{data.email} </div>
            </div>

            <div className="btn">
              <button
                onClick={rejectTeacherApproval}
                class="signInbtn border hover">
                Reject
              </button>
              <button
                onClick={acceptTeacherApproval}
                class="signInbtn border hover">
                Accept
              </button>
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
      )}
    </Fragment>
  );
};

export default TeacherApprovalDataMapping;
