import React, { Fragment, useState } from "react";
import "./Login.css";

const Login = () => {
  const [loginStudent, setLoginStudent] = useState(false);
  const [loginTeacher, setLoginTeacher] = useState(false);
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
          <button
            className="toggleButtonForLogin"
            onClick={() => {
              setLoginTeacher(false);
              setLoginStudent(true);
            }}>
            Student
          </button>
          <button
            className="toggleButtonForLogin"
            onClick={() => {
              setLoginTeacher(true);
              setLoginStudent(false);
            }}>
            Teacher
          </button>
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
