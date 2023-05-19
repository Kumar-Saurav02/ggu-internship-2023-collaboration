import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { loginStudents } from "../../actions/studentAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesOfUser = ["Student", "Teacher", "HOD"];
  const [typesOfUser, setTypeOfUser] = useState("");

  const {
    student,
    loading: studentLoading,
    isAuthenticated,
    error,
  } = useSelector((state) => state.registerLoginStudents);

  useEffect(() => {
    if (typesOfUser === "Student") {
      setLoginStudent(true);
      setLoginTeacher(false);
    } else if (typesOfUser === "Teacher") {
      setLoginStudent(false);
      setLoginTeacher(true);
    }
  }, [typesOfUser]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (isAuthenticated) {
      // window.alert("Login Successful");
      navigate("/courseSelection");
    }
  }, [isAuthenticated]);
  const [loginStudent, setLoginStudent] = useState(false);
  const [loginTeacher, setLoginTeacher] = useState(false);
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [email, setEmail] = useState("");
  const [passwordTeacher, setPasswordTeacher] = useState("");

  const loginStudentUsingDetails = () => {
    dispatch(loginStudents(enrollmentNo, passwordStudent));
  };

  return (
    <Fragment>
      {studentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <div className="heading">
              {!loginStudent && !loginTeacher && <h2>Login</h2>}
              {loginStudent && !loginTeacher && <h2>Login as Student</h2>}
              {!loginStudent && loginTeacher && <h2>Login as Teacher</h2>}
            </div>
            <div className="toggleForLogin">
              <select onChange={(e) => setTypeOfUser(e.target.value)}>
                <option value={typesOfUser}>User</option>
                {categoriesOfUser.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            {loginStudent && (
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Enrollment Number"
                    required
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={passwordStudent}
                    onChange={(e) => setPasswordStudent(e.target.value)}
                  />
                </div>
                <button onClick={loginStudentUsingDetails}>Login</button>
              </div>
            )}
            {loginTeacher && (
              <div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={passwordTeacher}
                    onChange={(e) => setPasswordTeacher(e.target.value)}
                  />
                </div>
                <button>Login</button>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
