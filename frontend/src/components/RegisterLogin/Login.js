import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { loginStudents } from "../../actions/studentAction";
import formfill from "../../Images/form_fill.jpg";
import ggulogo from "../../Images/logo_pic.jpg";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesOfUser = ["Student", "Teacher"];
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
      // navigate("/courseSelection");
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
    <div className="loginBox">
      <div className="lefthalf">
        <img class="loginImg" src={formfill} alt="student form fill" />
      </div>
      <div className="righthalf">
        <div class="welcome">
          <div>
            <img class="ggulogo" src={ggulogo} alt="ggu logo" />
          </div>
          <div>
            <h1>
              Welcome to <br />
              Guru Ghasidas{" "}
            </h1>
          </div>
        </div>

        <Fragment>
          <div className="full ">
            <div className="heading">
              {!loginStudent && !loginTeacher && <h2>Login</h2>}
              {loginStudent && !loginTeacher && <h2>Login as Student</h2>}
              {!loginStudent && loginTeacher && <h2>Login as Teacher</h2>}
            </div>

            <div className="toggleForLogin selct_user ">
              <select
                className="border"
                onChange={(e) => setTypeOfUser(e.target.value)}>
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
                    className="border"
                    type="text"
                    placeholder="Enrollment Number"
                    required
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="border"
                    type="password"
                    placeholder="Password"
                    required
                    value={passwordStudent}
                    onChange={(e) => setPasswordStudent(e.target.value)}
                  />
                </div>
                <div className="sign_in">
                  <button className="signInbtn border hover">Login</button>
                </div>
              </div>
            )}
            {loginTeacher && (
              <div>
                <div>
                  <input
                    className="border"
                    // employee ID krna hai
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="border"
                    type="password"
                    placeholder="Password"
                    required
                    value={passwordTeacher}
                    onChange={(e) => setPasswordTeacher(e.target.value)}
                  />
                </div>
                <div className="sign_in">
                  <button className="signInbtn border hover">Login</button>
                </div>
              </div>
            )}
            <div className="sign_in">
              <div className="regandfor">
                <button
                  onClick={() => navigate("/register")}
                  className="signInbtn border hover">
                  New Registration
                </button>
                <a className="forlin" href="google.com">
                  Forgot Password🤔
                </a>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default Login;
