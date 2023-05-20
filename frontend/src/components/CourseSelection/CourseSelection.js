import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseForStudent,
  logoutStudent,
} from "../../actions/studentAction";
import Loader from "../Loader/Loader";
import "./CourseSelection.css";
import "../studentScholarship/StudentScholarship.css";

const CourseSelection = () => {
  const dispatch = useDispatch();

  const { course, loading: courseLoading } = useSelector(
    (state) => state.courseForStudents
  );
  const {
    student,
    loading: studentLoading,
    isAuthenticated,
  } = useSelector((state) => state.registerLoginStudents);

  const [attendance, setAttendance] = useState();

  // const [semester, setSemester] = useState("");
  // const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  useEffect(() => {
    dispatch(getCourseForStudent());

    if (
      student !== undefined &&
      student.attendanceDetails &&
      student.attendanceDetails.length != 0
    ) {
      for (let i = 0; i < student.attendanceDetails.length; i++) {
        if (
          student.attendanceDetails[i].semester.toString() ===
          student.currentSemester.toString()
        ) {
          setAttendance(student.attendanceDetails[i].attendance);
        }
      }
    }
  }, [student]);

  const logoutKro = () => {
    dispatch(logoutStudent());
  };

  return (
    <Fragment>
      {courseLoading || studentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="courseSelection">
            <button onClick={logoutKro}>Logout</button>
            <h1>Course Selection</h1>
            <div className="detailsOfStudent">
              <p>Name: {student.name}</p>
              <p>Enrollment Number: {student.enrollmentNo}</p>
              <p>Current Semester: {student.currentSemester}</p>
              <p>
                <p>Attendance: </p>
                <p>
                  {attendance === undefined ? (
                    <p> Attendance is not uploaded for current semester</p>
                  ) : (
                    <p>{attendance}</p>
                  )}
                </p>
              </p>
            </div>
            <div className="courseDetails">
              <h2>Courses</h2>
              <div>
                {attendance < 75 || attendance === undefined ? (
                  <p>Attendance is not appropriate for course selection</p>
                ) : (
                  <div className="showdata">
                    <div className="Field_data_val">
                      <span className="data_n_title">
                        <h4>S. No</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Select</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Subject Name</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Subject Code</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Credits</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Category</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Cycle</h4>
                      </span>
                    </div>
                    {course.course &&
                      course.course.map((courses, i) => (
                        <div key={i} className="show_data_val">
                          <span className="data_n_title">
                            <h4>{i + 1}</h4>
                          </span>
                          <span className="data_n_title">
                            <h4>
                              {" "}
                              <button>[]</button>
                            </h4>
                          </span>
                          <span className="data_n_title">
                            <h4> {courses.subjectName}</h4>
                          </span>
                          <span className="data_n_title">
                            <h4> {courses.subjectCode}</h4>
                          </span>
                          <span className="data_n_title">
                            <h4> {courses.subjectCredit}</h4>
                          </span>
                          <span className="data_n_title">
                            <h4> {courses.category}</h4>
                          </span>
                          <span className="data_n_title">
                            <h4> {courses.cycle}</h4>
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="backSubjects">
              <h2>Back Subjects</h2>
              <div>
                {student.backSubject && student.backSubject.length === 0 ? (
                  <p>No active backlogs</p>
                ) : (
                  <div className="showdata">
                    <div className="Field_data_val">
                      <span className="data_n_title">
                        <h4>S. No</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Select</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Subject Name</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Subject Code</h4>
                      </span>
                      <span className="data_n_title">
                        <h4>Credits</h4>
                      </span>
                    </div>
                    {student.backSubject &&
                      student.backSubject.map((back, i) => (
                        <div key={i} className="show_data_val">
                          <span className="data_n_title">
                            <h4> </h4>
                          </span>
                          <span className="data_n_title">
                            <h4> </h4>
                          </span>
                          <span className="data_n_title">
                            <h4> </h4>
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseSelection;
