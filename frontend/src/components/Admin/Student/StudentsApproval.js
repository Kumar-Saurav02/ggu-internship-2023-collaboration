import React, { Fragment, useEffect } from "react";
import "./StudentApproval.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  studentApprovalRequest,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import StudentApprovalDataMapping from "./StudentApprovalDataMapping";
import { toast } from "react-toastify";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";

const StudentsApproval = () => {
  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    studentApproval,
    loading: studentApprovalLoading,
    error,
  } = useSelector((state) => state.studentsApprovalRequests);

  const {
    loading: acceptRejectLoading,
    message,
    error: acceptRejectError,
  } = useSelector((state) => state.acceptingRejectingStudentTeacherApproval);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (acceptRejectError) {
      toast.error(acceptRejectError);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/studentsApproval");
    }
  }, [acceptRejectError, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [error]);

  useEffect(() => {
    dispatch(studentApprovalRequest());
  }, []);

  return (
    <Fragment>
      {studentApprovalLoading || acceptRejectLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="studentDetails">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              {studentApproval &&
                studentApproval.map((studentData, i) => (
                  <div>
                    <p>{i + 1}</p>
                    <StudentApprovalDataMapping data={studentData} />
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentsApproval;
