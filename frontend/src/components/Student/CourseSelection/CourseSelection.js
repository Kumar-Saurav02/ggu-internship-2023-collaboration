import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseForStudent } from "../../../actions/studentAction";
import Loader from "../../Loader/Loader";
import "./CourseSelection.css";
import "../StudentScholarship/StudentScholarship.css";
import SidebarStudent from "../SidebarStudent/SidebarStudent";

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
  const [courseSelected, setCourseSelected] = useState(false);
  const [credits, setCredits] = useState(0);

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
    if (
      student !== undefined &&
      student.courseSelected &&
      student.courseSelected.length != 0
    ) {
      for (let i = 0; i < student.courseSelected.length; i++) {
        if (
          student.courseSelected[i].semester.toString() ===
          student.currentSemester.toString()
        ) {
          setCourseSelected(true);
        }
      }
    }
  }, [student]);

  useEffect(() => {
    if (
      credits === 0 &&
      course !== undefined &&
      course.course !== undefined &&
      course.course
    ) {
      var totalCredits = 0;
      for (let i = 0; i < course.course.length; i++) {
        totalCredits += course.course[i].subjectCredit;
      }
      setCredits(totalCredits);
    }
  }, [course]);

  return (
    <Fragment>
      {courseLoading || studentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="courseSelectionMain">
            <SidebarStudent />
            <div className="courseSelection">
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
                        <span>
                          <h4>S. No</h4>
                        </span>
                        <span>
                          <h4>Subject Name</h4>
                        </span>
                        <span>
                          <h4>Subject Code</h4>
                        </span>
                        <span>
                          <h4>Credits</h4>
                        </span>
                        <span>
                          <h4>Category</h4>
                        </span>
                        <span>
                          <h4>Term</h4>
                        </span>
                      </div>
                      {course.course &&
                        course.course.map((courses, i) => {
                          return (
                            <div key={i} className="show_data_val">
                              <span>
                                <h4>{i + 1}</h4>
                              </span>
                              <span>
                                <h4> {courses.subjectName}</h4>
                              </span>
                              <span>
                                <h4> {courses.subjectCode}</h4>
                              </span>
                              <span>
                                <h4> {courses.subjectCredit}</h4>
                              </span>
                              <span>
                                <h4> {courses.category}</h4>
                              </span>
                              <span>
                                <h4> {student.currentSemester} Semester</h4>
                              </span>
                            </div>
                          );
                        })}
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
                        <span>
                          <h4>S. No</h4>
                        </span>
                        <span>
                          <h4>Select</h4>
                        </span>
                        <span>
                          <h4>Subject Name</h4>
                        </span>
                        <span>
                          <h4>Subject Code</h4>
                        </span>
                        <span>
                          <h4>Credits</h4>
                        </span>
                      </div>
                      {student.backSubject &&
                        student.backSubject.map((back, i) => (
                          <div key={i} className="show_data_val">
                            <span>
                              <h4> {back.semester}</h4>
                            </span>
                            <span>
                              <h4>{back.subjectName} </h4>
                            </span>
                            <span>
                              <h4>{back.subjectCode} </h4>
                            </span>
                            <span>
                              <h4>{back.subjectCredit} </h4>
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h5>Total Credits</h5>
                <p>{credits}</p>
              </div>
              <div>
                {courseSelected && (
                  <div>
                    <h3>Course is already submitted.</h3>
                  </div>
                )}
                {!courseSelected && (
                  <div>
                    <button>Submit Course</button>
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
