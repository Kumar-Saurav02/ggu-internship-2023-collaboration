import React, { Fragment, useEffect } from "react";
import "./HODApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { teacherApprovalRequest } from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import TeacherApprovalDataMapping from "../Teacher/TeacherApprovalDataMapping";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const HODApproval = () => {
  const {
    teacherApproval,
    loading: teacherApprovalLoading,
    error,
  } = useSelector((state) => state.teachersApprovalRequests);

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
          <div className="teacherDetails">
          <Sidebar />
            <div className="request">
              <h1> Teacher's Approval</h1>
              <hr></hr>
              <br></br>
              {teacherApproval &&
                teacherApproval.map((teacherData, i) => {
                  if (teacherData.designation === "HOD") {
                    return (
                      <div>
                        
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

export default HODApproval;
