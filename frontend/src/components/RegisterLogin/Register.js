import React, { Fragment, useEffect, useState } from "react";
import { registerStudents } from "../../actions/studentAction";
import { registerTeachers } from "../../actions/teacherAction";
import { useDispatch } from "react-redux";
import Profile from "../../Images/Profile.png";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();

  const categoriesOfUser = ["Student", "Teacher", "HOD"];
  const [typesOfUser, setTypeOfUser] = useState("");

  useEffect(() => {
    if (typesOfUser === "Student") {
      setRegisterStudent(true);
      setRegisterTeacher(false);
      setRegisterHOD(false);
    } else if (typesOfUser === "Teacher") {
      setRegisterStudent(false);
      setRegisterTeacher(true);
      setRegisterHOD(false);
    } else if (typesOfUser === "HOD") {
      setRegisterStudent(false);
      setRegisterTeacher(false);
      setRegisterHOD(true);
    }
  }, [typesOfUser]);
  const [registerStudent, setRegisterStudent] = useState(false);
  const [registerTeacher, setRegisterTeacher] = useState(false);
  const [registerHOD, setRegisterHOD] = useState(false);
  const [student, setStudent] = useState({
    enrollmentNo: "",
    nameStudent: "",
    passwordStudent: "",
    confirmPasswordStudent: "",
  });
  const { enrollmentNo, nameStudent, passwordStudent, confirmPasswordStudent } =
    student;

  const [teacher, setTeacher] = useState({
    email: "",
    nameTeacher: "",
    passwordTeacher: "",
    confirmPasswordTeacher: "",
    gender: "",
    mobileNumber: "",
    profilePhoto: "",
  });
  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);
  const {
    email,
    nameTeacher,
    passwordTeacher,
    confirmPasswordTeacher,
    gender,
    mobileNumber,
    profilePhoto,
  } = teacher;

  const genders = ["Male", "Female"];

  const registerStudentDataChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const registerTeacherDataChange = (e) => {
    if (e.target.name === "profilePhoto") {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setTeacher({ ...teacher, [e.target.name]: e.target.value });
    }
  };

  const registerStudentDetails = (e) => {
    e.preventDefault();

    dispatch(
      registerStudents(
        enrollmentNo,
        nameStudent,
        passwordStudent,
        confirmPasswordStudent
      )
    );
  };
  const registerTeacherDetails = (e) => {
    e.preventDefault();

    const teacherData = new FormData();

    teacherData.set("enrollmentNumber", enrollmentNo);
    teacherData.set("name", nameTeacher);
    teacherData.set("gender", gender);
    teacherData.set("mobileNumber", mobileNumber);
    teacherData.set("password", passwordTeacher);
    teacherData.set("confirmPassword", confirmPasswordTeacher);

    dispatch(registerTeachers(teacherData, avatar));
  };

  return (
    <Fragment>
      <div className="register">
        <div className="heading">
          {!registerStudent && !registerTeacher && <h2>Register</h2>}
          {registerStudent && !registerTeacher && <h2>Register as Student</h2>}
          {!registerStudent && registerTeacher && <h2>Register as Teacher</h2>}
        </div>
        <div className="toggleForRegister">
          <select onChange={(e) => setTypeOfUser(e.target.value)}>
            <option value={typesOfUser}>User</option>
            {categoriesOfUser.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        {registerStudent && (
          <div>
            <div>
              <input
                type="text"
                placeholder="Enrollment Number"
                required
                name="enrollmentNo"
                value={enrollmentNo}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                name="nameStudent"
                value={nameStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                name="passwordStudent"
                value={passwordStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPasswordStudent"
                value={confirmPasswordStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <button onClick={registerStudentDetails}>Register</button>
          </div>
        )}
        {registerTeacher && (
          <div>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                name="nameTeacher"
                value={nameTeacher}
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <select name="gender" onChange={registerTeacherDataChange}>
                <option value={gender}>Gender</option>
                {genders.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Mobile Number"
                required
                name="mobileNumber"
                value={mobileNumber}
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                required
                name="profilePhoto"
                value={profilePhoto}
                accept="image/*"
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                name="passwordTeacher"
                value={passwordTeacher}
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPasswordTeacher"
                value={confirmPasswordTeacher}
                onChange={registerTeacherDataChange}
              />
            </div>
            <button onClick={registerTeacherDetails}>Register</button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Register;
