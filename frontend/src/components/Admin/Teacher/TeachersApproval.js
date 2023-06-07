import React, { Fragment, useEffect } from "react";
import "./TeacherApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { teacherApprovalRequest } from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import TeacherApprovalDataMapping from "./TeacherApprovalDataMapping";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const TeachersApproval = () => {
  const dispatch = useDispatch();

  const {
    teacherApproval,
    loading: teacherApprovalLoading,
    error,
  } = useSelector((state) => state.teachersApprovalRequests);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(teacherApprovalRequest());
  }, [dispatch, error]);

  return (
    <Fragment>
      {teacherApprovalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <Sidebar />
            <div>
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
