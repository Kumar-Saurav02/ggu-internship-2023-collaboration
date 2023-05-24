import React, { Fragment, useEffect } from "react";
import "./TeacherApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { teacherApprovalRequest } from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import TeacherApprovalDataMapping from "./TeacherApprovalDataMapping";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const TeachersApproval = () => {
  const {
    teacherApproval,
    loading: teacherApprovalLoading,
    error,
  } = useSelector((state) => state.teachersApprovalRequests);

  console.log(teacherApproval);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(teacherApprovalRequest());
  }, [dispatch]);

  return (
    <Fragment>
      {teacherApprovalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Sidebar />
          <div>
            {teacherApproval &&
              teacherApproval.map((teacherData, i) => (
                <div>
                  <p>{i + 1}</p>
                  <TeacherApprovalDataMapping data={teacherData} />
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeachersApproval;
