import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearMessages,
  getAllTeacherDetails,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import Sidebar from "../Sidebar/Sidebar";
import "./ChangingTeacherRole.css";
import TeacherDetails from "./TeacherDetails";

const ChangingTeacherRole = () => {
  const dispatch = useDispatch();

  const {
    loading: teacherLoading,
    teachers,
    error: teacherError,
  } = useSelector((state) => state.getAllTeacherDetails);

  const {
    loading: roleLoading,
    message,
    error: roleError,
  } = useSelector((state) => state.updateTeacherRole);

  useEffect(() => {
    dispatch(getAllTeacherDetails());
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
    if (roleError) {
      toast.error(roleError);
      dispatch(clearMessages());
    }
    if (teacherError) {
      toast.error(teacherError);
      dispatch(clearMessages());
    }
  }, [teacherError, message, roleError]);

  return (
    <Fragment>
      {teacherLoading || roleLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="changingTeacherRoles">
            <Sidebar />
            <div className="request">
            <h1> Role Management</h1>
              <hr></hr>
              <br></br>
              <div>
                {teachers &&
                  teachers.map((teacher, i) => (
                    <div key={i}>
                      <TeacherDetails data={teacher} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ChangingTeacherRole;
