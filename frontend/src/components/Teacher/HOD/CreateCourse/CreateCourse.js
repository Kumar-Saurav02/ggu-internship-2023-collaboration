import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CreateCourse.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseByHOD,
  getAllSubjects,
} from "../../../../actions/hodAction";
import Loader from "../../../Loader/Loader";
import { clearMessages } from "../../../../actions/adminAction";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";

const CreateCourse = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: courseLoading,
    message,
    error: courseError,
  } = useSelector((state) => state.createCourseByHOD);

  const {
    loading: subjectLoading,
    subjects,
    error: subjectError,
  } = useSelector((state) => state.getAllSubjects);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
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
  const [course, setCourse] = useState([]);
  const [subjectCode, setSubjectCode] = useState();
  const [subjectCategory, setSubjectCategory] = useState("Compulsory");

  const addingCourseDetail = () => {
    if (subjectCode.trim() === "") {
      return toast.error("Select Subjects Properly");
    }
    const data = subjects.filter(function (d) {
      return d.subjectCode === subjectCode;
    });

    setCourse((previous) => [
      ...previous,
      [
        data[0].subjectName,
        subjectCode,
        data[0].subjectCredit,
        subjectCategory,
      ],
    ]);
  };

  const submitCreateCourseDetail = () => {
    if (semester.trim() === "") {
      return toast.error("Select semester properly");
    }
    if (department === "") {
      return toast.error("Select department properly");
    }
    dispatch(createCourseByHOD(semester, department, course));
  };

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (courseError) {
      toast.error(courseError);
      dispatch(clearMessages());
    }
    if (subjectError) {
      toast.error(subjectError);
      dispatch(clearMessages());
    }
  }, [message, courseError, subjectError]);

  return (
    <Fragment>
      {courseLoading || subjectLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="createCourse">
            <SidebarTeacher role={teacher.subRole}/>
            <div className="registerBox">
              <div className="Data_entry">
              <h2>Create Course</h2>
              <hr></hr>
              <br></br>
              
              <div className="entry">
                    <label className="label_name" for="{sem}">
                      Semester
                    </label>
                    <select
                      className="label_name"
                    required
                    onChange={(e) => setSemester(e.target.value)}>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="entry">
                    <label className="label_name" for="{sem}">
                      Department
                    </label>
                    <select
                      className="label_name"
                    required
                    onChange={(e) => setDepartment(e.target.value)}>
                    {departments.map((depart) => (
                      <option key={depart} value={depart}>
                        {depart}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="entry">
                    <label className="label_name" for="{sem}">
                      Subject Name
                    </label>
                    <select
                      className="label_name"
                      required
                      onChange={(e) => setSubjectCode(e.target.value)}>
                      <option>Subjects</option>
                      {subjects &&
                        subjects.map((sub) => (
                          <option key={sub._id} value={sub.subjectCode}>
                            {sub.subjectName} - {sub.subjectCode}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="entry">
                    <label className="label_name" for="{subjectCategory}">
                      Subject Category
                    </label>
                    <input
                      className="label_name"
                      type="text"
                      placeholder="Subject Category"
                      disabled
                      required
                      value={subjectCategory}
                      onChange={(e) => setSubjectCategory(e.target.value)}
                    />
                  </div>
                  <br></br>
                  
                  <div className="btn">
                    <button 
                      className="signInbtn border hover"
                      onClick={addingCourseDetail}>Add Course
                    </button>
                  </div>
                  <br></br>
                
                <div>
                  <table>
                    <tr>
                      <th>Subject Name</th>
                      <th>Subject Code</th>
                      <th>Subject Credit</th>
                      <th>Category</th>
                    </tr>
                    {course &&
                      course.map((cou, i) => (
                        <tr key={i}>
                          <td>{cou[0]}</td>
                          <td>{cou[1]}</td>
                          <td>{cou[2]}</td>
                          <td>{cou[3]}</td>
                        </tr>
                      ))}
                  </table>
                  {course && course.length === 0 && (
                    <div>
                      <h2>No subject selected</h2>
                    </div>
                  )}
                </div>
              
              <div>
                <button onClick={submitCreateCourseDetail}>
                  Create Course
                </button>
              </div>
            </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateCourse;
