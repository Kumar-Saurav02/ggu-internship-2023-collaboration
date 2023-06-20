import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearMessages } from "../../../../actions/adminAction";
import { courseApprovalByIncharge } from "../../../../actions/teacherAction";
import Loader from "../../../Loader/Loader";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import "./CourseApproval.css";
import CourseApprovalMapping from "./CourseApprovalMapping";

const CourseApproval = () => {
  const dispatch = useDispatch();

  const {
    courses,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.getCoursesForApproval);

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  useEffect(() => {
    dispatch(courseApprovalByIncharge());
  }, [dispatch]);

  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch(clearMessages());
    }
  }, [courseError]);

  return (
    <Fragment>
      {courseLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="courseApproval">
            <SidebarTeacher role={teacher.subRole}/>
            <div className="approvBox">
              <div className="request">
                <h1>Mark's Entry</h1>
                  <hr></hr>
                  <br></br>
                {courses &&
                  courses.map((course, i) => (
                    <div key={i}>
                      <CourseApprovalMapping data={course} />
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

export default CourseApproval;
