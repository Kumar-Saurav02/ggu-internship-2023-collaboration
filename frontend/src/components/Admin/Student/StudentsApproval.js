import React, { Fragment, useEffect } from "react";
import "./StudentApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { studentApprovalRequest } from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import StudentApprovalDataMapping from "./StudentApprovalDataMapping";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const StudentsApproval = () => {
  const {
    studentApproval,
    loading: studentApprovalLoading,
    error,
  } = useSelector((state) => state.studentsApprovalRequests);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(studentApprovalRequest());
  }, [dispatch]);

  return (
    <Fragment>
      {studentApprovalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Sidebar />
          <div>
            {studentApproval &&
              studentApproval.map((studentData, i) => (
                <div>
                  <p>{i + 1}</p>
                  <StudentApprovalDataMapping data={studentData} />
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentsApproval;
