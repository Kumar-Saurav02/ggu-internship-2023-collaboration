import React, { Fragment, useEffect } from "react";
import "./HODApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { teacherApprovalRequest } from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import TeacherApprovalDataMapping from "../Teacher/TeacherApprovalDataMapping";
import { toast } from "react-toastify";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";

const HODApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

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
  }, [dispatch]);

  return (
    <Fragment>
      {teacherApprovalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              {teacherApproval &&
                teacherApproval.map((teacherData, i) => {
                  if (teacherData.designation === "HOD") {
                    return (
                      <div>
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

export default HODApproval;
