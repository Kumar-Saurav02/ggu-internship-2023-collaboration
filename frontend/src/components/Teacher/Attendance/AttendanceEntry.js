import React, { Fragment, useEffect, useState } from "react";
import "./AttendanceEntry.css";
import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseSubjectsList,
  getStudentSemesterDepartment,
} from "../../../actions/studentAction";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { clearMessages } from "../../../actions/adminAction";
import {
  attendanceEntryBySubjectTeacher,
  getAttendanceDetailBySubject,
} from "../../../actions/teacherAction";

const AttendanceEntry = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: studentsListLoading,
    students: studentDetails,
    error: studentDetailsError,
  } = useSelector((state) => state.getStudentsBaseOnSemesterAndDepartment);

  const {
    subjects,
    loading: subjectListsLoading,
    error: subjectListError,
  } = useSelector((state) => state.getCourseSubjectsList);

  const {
    loading: attendanceSubmissionLoading,
    message: attendanceSubmissionMessage,
    error: attendanceSubmissionError,
  } = useSelector((state) => state.submitAttendanceEntryBySubjectTeacher);

  const {
    loading: attendanceDetailsLoading,
    attendanceDetails,
    error: attendanceDetailsError,
  } = useSelector((state) => state.getAttendanceEntryBySubject);

  console.log(studentDetails);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];
  const [semester, setSemester] = useState(1);
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [monthName, setMonthName] = useState();
  const [loadInput, setLoadInput] = useState(false);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [attendanceStudent, setAttendanceStudent] = useState([]);

  const handleChangeAttendance = (i, e) => {
    if (totalAttendance === 0) {
      return toast.error("Fill total attendance first");
    }
    const values = [...attendanceStudent];
    values[i] = e.target.value;
    setAttendanceStudent(values);
  };

  const submitAttendance = () => {
    if (subject === undefined || subject.trim() === "") {
      return toast.error("Select Subject");
    }
    if (monthName === undefined || monthName.trim() === "") {
      return toast.error("Select Month");
    }
    var allDetails = [];
    for (let j = 0; j < studentDetails.length; j++) {
      if (Number(attendanceStudent[j]) > Number(totalAttendance)) {
        return toast.error(
          `${studentDetails[j].name} Attendance Is Exceeding Total Attendance`
        );
      }
      if (
        Number(attendanceStudent[j]) < 0 ||
        Number.isNaN(attendanceStudent[j]) === true
      ) {
        return toast.error(
          `${studentDetails[j].name} Attendance Is Not Filled Properly`
        );
      }
      allDetails.push({
        name: studentDetails[j].name,
        rollNumber: studentDetails[j].rollNo,
        enrollmentNumber: studentDetails[j].enrollmentNo,
        subjectName: subject,
        monthName: monthName,
        attendance: Number(attendanceStudent[j]),
        totalAttendance: Number(totalAttendance),
      });
    }
    dispatch(attendanceEntryBySubjectTeacher(semester, department, allDetails));
  };

  const getStudentListForAttendance = () => {
    dispatch(getStudentSemesterDepartment(semester, department));
    dispatch(getCourseSubjectsList(semester, department));
  };

  useEffect(() => {
    if (
      studentDetails !== null &&
      subjects !== null &&
      studentDetails !== undefined &&
      subjects !== undefined &&
      studentDetails.length > 0 &&
      subjects.length > 0
    ) {
      setLoadInput(true);
    }
  }, [subjects, studentDetails]);

  useEffect(() => {
    if (studentDetailsError) {
      toast.error(studentDetailsError);
      dispatch(clearMessages());
    }
    if (subjectListError) {
      toast.error(subjectListError);
      dispatch(clearMessages());
    }
    if (attendanceSubmissionError) {
      toast.error(attendanceSubmissionError);
      dispatch(clearMessages());
    }
    if (attendanceSubmissionMessage) {
      toast.success(attendanceSubmissionMessage);
      dispatch(clearMessages());
      setAttendanceStudent([]);
    }
  }, [
    studentDetailsError,
    subjectListError,
    attendanceSubmissionError,
    attendanceSubmissionMessage,
  ]);

  useEffect(() => {
    if (department.trim() !== "" && subject.trim() !== "") {
      dispatch(getAttendanceDetailBySubject(semester, department, subject));
    }
  }, [subject]);
  
  return (
    <Fragment>
      {studentsListLoading ||
      subjectListsLoading ||
      attendanceSubmissionLoading ||
      attendanceDetailsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="attendanceEntry">
            <SidebarTeacher role={teacher.subRole}  />
            <div className="approvBox">
              <div className="subsection" >
              <h1>Attendance Entry</h1>
              <hr></hr>
              <br></br>
              
                <div className="entry">
                  <label className="label_name" for="">
                      Semester
                    </label>
                  <select
                    id="label_input"
                    required
                    onChange={(e) => setSemester(e.target.value)}>
                    <option>Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
                <br></br>
                <div className="entry">
                    <label className="label_name" for="">
                        Department
                      </label>
                    <select
                    id="label_input"
                    required
                    onChange={(e) => setDepartment(e.target.value)}>
                    <option>Department</option>
                    {departments.map((depart) => (
                      <option key={depart} value={depart}>
                        {depart}
                      </option>
                    ))}
                  </select>
                </div>
                <br></br>
                <div className="">
                  <button 
                    className="signInbtn border hover"
                    onClick={getStudentListForAttendance}>
                    Get Students Lists
                  </button>
                </div>
              </div>
              
              {loadInput && (
                <div className="subsection">
                  <div >
                    <br></br>
                    <h2>Semester : {semester}</h2>
                    <br></br>
                    <h2>Department : {department}</h2>
                    <br></br>
                  </div>
                    <div className="entry">
                      <label className="label_name" for="">
                          Select Month
                        </label>
                      <select
                        id="label_input"
                        value={monthName}
                        onChange={(e) => setMonthName(e.target.value)}>
                        <option>Select Month</option>
                        {months &&
                          months.map((month, i) => (
                            <option key={i} value={month}>
                              {month}
                            </option>
                          ))}
                      </select>
                      
                    </div>
                            <br></br>
                    <div className="entry">
                      <label className="label_name" for="">
                          Select Subject
                        </label>
                        <select
                          id="label_input"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}>
                          <option>Subjects</option>
                          {subjects &&
                            subjects.map((sub, i) => (
                              <option key={i} value={sub.subjectName}>
                                {sub.subjectName}
                              </option>
                            ))}
                        </select>
                    </div>
                    <br></br>
                  
                  <div className="entry">
                  <label
                      className="label_name"
                      for="{totalAttendance}">
                      Total AttendanceEntry
                    </label>
                    <input
                      required
                      value={totalAttendance}
                      type="number"
                      placeholder="Total Attendance"
                      onChange={(e) => setTotalAttendance(e.target.value)}
                    />
                  </div>
                  <div>
                    {studentDetails &&
                      studentDetails.sort(function (a, b) {
                        return a.rollNo - b.rollNo;
                      }) &&
                      studentDetails.map((sub, i) => (
                        <div>
                          <p>{sub.name}</p>
                          <p>{sub.rollNo}</p>
                          <input
                            type="number"
                            placeholder="Enter Attendance"
                            value={attendanceStudent[i]}
                            onChange={(e) => handleChangeAttendance(i, e)}
                          />
                        </div>
                        
                      ))}
                  </div>
                  <div className="btn">
                    <button 
                      className="signInbtn border hover"
                      onClick={submitAttendance}>Submit Attendance</button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AttendanceEntry;
