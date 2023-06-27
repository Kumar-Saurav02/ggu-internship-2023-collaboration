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
      <div className="content">
        <div className="key">{key}</div>

        <div className="col">
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

        <div className="btn_acceptReject">
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
    </Fragment>
  );
};

export default TeacherApprovalDataMapping;
