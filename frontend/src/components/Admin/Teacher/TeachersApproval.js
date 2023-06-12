import React, { Fragment, useEffect } from "react";
import "./TeacherApproval.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  teacherApprovalRequest,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import TeacherApprovalDataMapping from "./TeacherApprovalDataMapping";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const TeachersApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    teacherApproval,
    loading: teacherApprovalLoading,
    error,
  } = useSelector((state) => state.teachersApprovalRequests);

  const {
    loading,
    message,
    error: acceptRejectError,
  } = useSelector((state) => state.acceptingRejectingStudentTeacherApproval);

  useEffect(() => {
    if (acceptRejectError) {
      toast.error(acceptRejectError);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/teachersApproval");
    }
  }, [error, message, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(teacherApprovalRequest());
  }, [dispatch, error]);

  return (
    <Fragment>
      {teacherApprovalLoading || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <Sidebar />
            <div className="request">
              <h1> Student's Approval</h1>
              <hr></hr>
              <br></br>
              {teacherApproval &&
                teacherApproval.map((teacherData, i) => {
                  if (teacherData.designation !== "HOD") {
                    return (
                      <div key={i}>
                        {/* <p>{i + 1}</p> */}
                        <TeacherApprovalDataMapping data={teacherData} />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeachersApproval;
