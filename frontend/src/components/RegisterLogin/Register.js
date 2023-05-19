import React, { Fragment, useEffect, useState } from "react";
import { registerStudents } from "../../actions/studentAction";
import { registerTeachers } from "../../actions/teacherAction";
import { useDispatch } from "react-redux";
import Profile from "../../Images/Profile.png";
import { State } from "country-state-city";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();

  const categoriesOfUser = ["Student", "Teacher", "HOD"];
  const [typesOfUser, setTypeOfUser] = useState("");
  const [registerStudent, setRegisterStudent] = useState(false);
  const [registerTeacher, setRegisterTeacher] = useState(false);

  useEffect(() => {
    if (typesOfUser === "Student") {
      setRegisterStudent(true);
      setRegisterTeacher(false);
    } else if (typesOfUser === "Teacher") {
      setRegisterStudent(false);
      setRegisterTeacher(true);
    }
  }, [typesOfUser]);

  const [student, setStudent] = useState({
    enrollmentNo: "",
    nameStudent: "",
    rollNoStudent: "",
    fatherNameStudent: "",
    motherNameStudent: "",
    currentSemesterStudent: "",
    emailStudent: "",
    mobileNumberStudent: "",
    fatherMobileNumberStudent: "",
    motherMobileNumberStudent: "",
    genderStudent: "",
    // dateOfBirthStudent: "",
    // dateOfJoiningStudent: "",
    religionStudent: "",
    bloodGroupStudent: "",
    categoryStudent: "",
    physicallyHandicappedStudent: "",
    aadharNumberStudent: "",
    hostelerStudent: "",
    localAddressStudent: "",
    localStateStudent: "",
    localPinCodeStudent: "",
    permanentAddressStudent: "",
    permanentStateStudent: "",
    permanentPinCodeStudent: "",
    photoUploadStudent: "",
    signatureUploadStudent: "",
    passwordStudent: "",
    confirmPasswordStudent: "",
  });
  const {
    enrollmentNo,
    nameStudent,
    rollNoStudent,
    fatherNameStudent,
    motherNameStudent,
    currentSemesterStudent,
    emailStudent,
    mobileNumberStudent,
    fatherMobileNumberStudent,
    motherMobileNumberStudent,
    genderStudent,
    // dateOfBirthStudent,
    // dateOfJoiningStudent,
    religionStudent,
    bloodGroupStudent,
    categoryStudent,
    physicallyHandicappedStudent,
    aadharNumberStudent,
    hostelerStudent,
    localAddressStudent,
    localStateStudent,
    localPinCodeStudent,
    permanentAddressStudent,
    permanentStateStudent,
    permanentPinCodeStudent,
    photoUploadStudent,
    signatureUploadStudent,
    passwordStudent,
    confirmPasswordStudent,
  } = student;

  const [teacher, setTeacher] = useState({
    emailTeacher: "",
    nameTeacher: "",
    genderTeacher: "",
    mobileNumberTeacher: "",
    departmentTeacher: "",
    designationTeacher: "",
    // dateOfBirthTeacher: "",
    qualificationTeacher: "",
    assignSubjectTeacher: [],
    resumeTeacher: "",
    profilePhotoTeacher: "",
    signatureTeacher: "",
    passwordTeacher: "",
    confirmPasswordTeacher: "",
  });
  const {
    emailTeacher,
    nameTeacher,
    genderTeacher,
    mobileNumberTeacher,
    departmentTeacher,
    designationTeacher,
    // dateOfBirthTeacher,
    qualificationTeacher,
    assignSubjectTeacher,
    resumeTeacher,
    profilePhotoTeacher,
    signatureTeacher,
    passwordTeacher,
    confirmPasswordTeacher,
  } = teacher;
  const [avatarStudent, setAvatarStudent] = useState(Profile);
  const [avatarPreviewStudent, setAvatarPreviewStudent] = useState(Profile);
  const [avatarTeacher, setAvatarTeacher] = useState(Profile);
  const [avatarPreviewTeacher, setAvatarPreviewTeacher] = useState(Profile);
  const [signatureAvatarStudent, setSignatureAvatarStudent] = useState(Profile);
  const [signaturePreviewStudent, setSignaturePreviewStudent] =
    useState(Profile);
  const [signatureAvatarTeacher, setSignatureAvatarTeacher] = useState(Profile);
  const [signaturePreviewTeacher, setSignaturePreviewTeacher] =
    useState(Profile);
  const [resumeFileTeacher, setResumeFileTeacher] = useState(Profile);
  const [dateOfBirthStudent, setDateOfBirthStudent] = useState();
  const [dateOfJoiningStudent, setDateOfJoiningStudent] = useState();
  const [dateOfBirthTeacher, setDateOfBirthTeacher] = useState();

  const genders = ["Male", "Female"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const religions = ["Hindu", "Christians", "Sikh", "Muslim", "Jain", "Others"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const categories = ["OPEN", "OBC", "OBC(NCL)", "SC", "ST", "EWS"];
  const yesNo = ["Yes", "No"];
  const designations = ["Professor", "Assistant Professor", "HOD"];
  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];

  const registerStudentDataChange = (e) => {
    if (e.target.name === "photoUploadStudent") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreviewStudent(reader.result);
          setAvatarStudent(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "signatureUploadStudent") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignaturePreviewStudent(reader.result);
          setSignatureAvatarStudent(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setStudent({ ...student, [e.target.name]: e.target.value });
    }
  };
  const registerTeacherDataChange = (e) => {
    if (e.target.name === "profilePhotoTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreviewTeacher(reader.result);
          setAvatarTeacher(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "signatureTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignatureAvatarTeacher(reader.result);
          setSignaturePreviewTeacher(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "resumeTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setResumeFileTeacher(reader.result);
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
        rollNoStudent,
        fatherNameStudent,
        motherNameStudent,
        currentSemesterStudent,
        emailStudent,
        mobileNumberStudent,
        fatherMobileNumberStudent,
        motherMobileNumberStudent,
        genderStudent,
        dateOfBirthStudent,
        dateOfJoiningStudent,
        religionStudent,
        bloodGroupStudent,
        categoryStudent,
        physicallyHandicappedStudent,
        aadharNumberStudent,
        hostelerStudent,
        localAddressStudent,
        localStateStudent,
        localPinCodeStudent,
        permanentAddressStudent,
        permanentStateStudent,
        permanentPinCodeStudent,
        avatarStudent,
        signatureAvatarStudent,
        passwordStudent,
        confirmPasswordStudent
      )
    );
  };
  const registerTeacherDetails = (e) => {
    e.preventDefault();

    dispatch(
      registerTeachers(
        emailTeacher,
        nameTeacher,
        genderTeacher,
        mobileNumberTeacher,
        departmentTeacher,
        designationTeacher,
        dateOfBirthTeacher,
        qualificationTeacher,
        assignSubjectTeacher,
        resumeFileTeacher,
        avatarTeacher,
        signatureAvatarTeacher,
        passwordTeacher,
        confirmPasswordTeacher
      )
    );
  };

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
          placeholder: "Assigned Subject",
          required: true,
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
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
                type="text"
                placeholder="Roll Number"
                required
                name="rollNoStudent"
                value={rollNoStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Father's Name"
                required
                name="fatherNameStudent"
                value={fatherNameStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mother's Name"
                required
                name="motherNameStudent"
                value={motherNameStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <select
                required
                name="currentSemesterStudent"
                onChange={registerStudentDataChange}>
                <option value={currentSemesterStudent}>Semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                name="emailStudent"
                value={emailStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Mobile Number"
                required
                name="mobileNumberStudent"
                value={mobileNumberStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Father's Mobile Number"
                required
                name="fatherMobileNumberStudent"
                value={fatherMobileNumberStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Father's Mobile Number"
                required
                name="motherMobileNumberStudent"
                value={motherMobileNumberStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <select
                required
                name="genderStudent"
                onChange={registerStudentDataChange}>
                <option value={genderStudent}>Gender</option>
                {genders.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* Calendar */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Birth"
                  value={dateOfBirthStudent}
                  onChange={(newValue) => setDateOfBirthStudent(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div>
              {/* Calendar */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Joining"
                  value={dateOfJoiningStudent}
                  onChange={(newValue) => setDateOfJoiningStudent(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div>
              <select
                required
                name="religionStudent"
                onChange={registerStudentDataChange}>
                <option value={religionStudent}>Religion</option>
                {religions.map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                required
                name="bloodGroupStudent"
                onChange={registerStudentDataChange}>
                <option value={bloodGroupStudent}>Blood Group</option>
                {bloodGroups.map((bloodGroup) => (
                  <option key={bloodGroup} value={bloodGroup}>
                    {bloodGroup}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                required
                name="categoryStudent"
                onChange={registerStudentDataChange}>
                <option value={categoryStudent}>Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                required
                name="physicallyHandicappedStudent"
                onChange={registerStudentDataChange}>
                <option value={physicallyHandicappedStudent}>
                  Physically Handicapped
                </option>
                {yesNo.map((yn) => (
                  <option key={yn} value={yn}>
                    {yn}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Aadhar Number"
                required
                name="aadharNumberStudent"
                value={aadharNumberStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <select
                required
                name="hostelerStudent"
                onChange={registerStudentDataChange}>
                <option value={hostelerStudent}>Hosteler</option>
                {yesNo.map((yn) => (
                  <option key={yn} value={yn}>
                    {yn}
                  </option>
                ))}
              </select>
            </div>
            <h3>Local Address</h3>
            <div>
              <input
                type="text"
                placeholder="Local Address"
                required
                name="localAddressStudent"
                value={localAddressStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <select
                required
                name="localStateStudent"
                value={localStateStudent}
                onChange={registerStudentDataChange}>
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Pin Code"
                required
                name="localPinCodeStudent"
                value={localPinCodeStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <h3>Permanent Address</h3>
            <div>
              <input
                type="number"
                placeholder="Permanent Address"
                required
                name="permanentAddressStudent"
                value={permanentAddressStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <div>
              <select
                required
                name="permanentStateStudent"
                value={permanentStateStudent}
                onChange={registerStudentDataChange}>
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Pin Code"
                required
                name="permanentPinCodeStudent"
                value={permanentPinCodeStudent}
                onChange={registerStudentDataChange}
              />
            </div>
            <h3>Photo Upload</h3>
            <div>
              <img src={avatarPreviewStudent} alt="Avatar Preview" />
              <input
                type="file"
                required
                name="photoUploadStudent"
                value={photoUploadStudent}
                accept="image/*"
                onChange={registerTeacherDataChange}
              />
            </div>
            <h3>Signature Upload</h3>
            <div>
              <img src={signaturePreviewStudent} alt="Signature Preview" />
              <input
                type="file"
                required
                name="signatureUploadStudent"
                value={signatureUploadStudent}
                accept="image/*"
                onChange={registerTeacherDataChange}
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

        {/* TEACHER */}
        {registerTeacher && (
          <div>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                name="emailTeacher"
                value={emailTeacher}
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
              <select
                required
                name="genderTeacher"
                onChange={registerTeacherDataChange}>
                <option value={genderTeacher}>Gender</option>
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
                name="mobileNumberTeacher"
                value={mobileNumberTeacher}
                onChange={registerTeacherDataChange}
              />
            </div>
            <div>
              <select
                required
                name="departmentTeacher"
                onChange={registerStudentDataChange}>
                <option value={departmentTeacher}>Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                required
                name="designationTeacher"
                onChange={registerStudentDataChange}>
                <option value={designationTeacher}>Designation</option>
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* Calendar */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Birth"
                  value={dateOfBirthTeacher}
                  onChange={(newValue) => setDateOfBirthTeacher(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div>
              <input
                type="text"
                placeholder="Qualification"
                required
                name="qualificationTeacher"
                value={qualificationTeacher}
                onChange={registerStudentDataChange}
              />
            </div>

            <div>
              <h3>Assigned Subject</h3>
              <button onClick={addInput}>Add another field</button>
              {arr.map((item, i) => {
                return (
                  <input
                    onChange={handleChange}
                    value={item.value}
                    id={i}
                    type={item.type}
                    size="40"
                  />
                );
              })}
            </div>
            <h3>Photo Upload</h3>
            <div>
              <img src={avatarPreviewTeacher} alt="Avatar Preview" />
              <input
                type="file"
                required
                name="profilePhotoTeacher"
                value={profilePhotoTeacher}
                accept="image/*"
                onChange={registerTeacherDataChange}
              />
            </div>
            <h3>Signature Upload</h3>
            <div>
              <img src={signaturePreviewTeacher} alt="Signature Preview" />
              <input
                type="file"
                required
                name="signatureTeacher"
                value={signatureTeacher}
                accept="image/*"
                onChange={registerTeacherDataChange}
              />
            </div>
            <h3>Resume Upload</h3>
            <div>
              <input
                type="file"
                required
                name="resumeTeacher"
                value={resumeTeacher}
                accept="pdf/*"
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
