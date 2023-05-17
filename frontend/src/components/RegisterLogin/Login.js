import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";

const Login = () => {
  const categoriesOfUser = ["Student", "Teacher", "HOD"];
  const [typesOfUser, setTypeOfUser] = useState("");

  useEffect(() => {
    if (typesOfUser === "Student") {
      setLoginStudent(true);
      setLoginTeacher(false);
      setLoginHOD(false);
    } else if (typesOfUser === "Teacher") {
      setLoginStudent(false);
      setLoginTeacher(true);
      setLoginHOD(false);
    } else if (typesOfUser === "HOD") {
      setLoginStudent(false);
      setLoginTeacher(false);
      setLoginHOD(true);
    }
  }, [typesOfUser]);
  const [loginStudent, setLoginStudent] = useState(false);
  const [loginTeacher, setLoginTeacher] = useState(false);
  const [loginHOD, setLoginHOD] = useState(false);
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [email, setEmail] = useState("");
  const [passwordTeacher, setPasswordTeacher] = useState("");

  return (
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
            <button>Login</button>
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
  );
};

export default Login;
