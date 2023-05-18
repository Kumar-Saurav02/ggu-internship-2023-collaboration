import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import formfill from "../../Images/form_fill.jpg";
import ggulogo from "../../Images/logo_pic.jpg";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


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

    <div className="loginBox">
        <div className="lefthalf">
            <img
              class="loginImg"
              src={formfill}
              alt="student form fill"
            />
        </div>
        <div className="righthalf">

            <div class="welcome">
              <div ><img class="ggulogo" src={ggulogo} alt="ggu logo" /></div>
              <div>
                <h1>Welcome to <br />Guru Ghasidas </h1>
              </div>
            </div>


            <Fragment >
              <div className="full ">
                <div className="heading">
                  {!loginStudent && !loginTeacher && <h2>Login</h2>}
                  {loginStudent && !loginTeacher && <h2>Login as Student</h2>}
                  {!loginStudent && loginTeacher && <h2>Login as Teacher</h2>}
                </div>

                <div className="toggleForLogin selct_user ">
                  
                  <select className="border" onChange={(e) => setTypeOfUser(e.target.value)}>
                    <option  value={typesOfUser}>User</option>
                    {categoriesOfUser.map((user) => (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="placed">
                  {!loginStudent && !loginTeacher && 
                      <div>
                      
                        <div >
                            <input className="border"
                              type="text"
                              placeholder="Enter ID"
                              required
                            />
                        </div>
                        <div >
                            <input className="border"
                              type="password"
                              placeholder="Enter Password"
                              required
                            />
                        </div>
                          <div className="sign_in">
                        <button className="signInbtn border hover">Login</button>
                        <div className="regandfor">
                            <button className="signInbtn border hover">New Register</button>
                            <a className="forlin" href="google.com">Forgot Password🤔</a>
                        </div>
                    </div>
                      </div>   
                  }
                </div>

              {loginStudent && 
              (
                  <div>
                    <div >
                      <input className="border"
                        type="text"
                        placeholder="Enrollment Number"
                        required
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value)}
                      />
                    </div>
                    <div >
                      <input className="border"
                        type="password"
                        placeholder="Password"
                        required
                        value={passwordStudent}
                        onChange={(e) => setPasswordStudent(e.target.value)}
                      />
                    </div>
                    <div className="sign_in">
                        <button className="signInbtn border hover">Login</button>
                        <div className="regandfor">
                            <button className="signInbtn border hover">New Register</button>
                            <a className="forlin" href="google.com">Forgot Password🤔</a>
                        </div>
                    </div>
                  </div>
                )}
                {loginTeacher && (
                  <div>
                    <div >
                      <input className="border"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div >
                      <input className="border"
                        type="password"
                        placeholder="Password"
                        required
                        value={passwordTeacher}
                        onChange={(e) => setPasswordTeacher(e.target.value)}
                      />
                    </div>

                    <div className="sign_in">
                        <button className="signInbtn border hover">Login</button>
                        <div className="regandfor">
                            <button className="signInbtn border hover">New Register</button>
                            <a className="forlin" href="google.com">Forgot Password🤔</a>
                        </div>
                          
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
            
          </div>
    </div>
  );
};

export default Login;