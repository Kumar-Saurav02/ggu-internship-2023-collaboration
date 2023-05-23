import React, { Fragment, useEffect, useState } from "react";
import { registerStudents } from "../../actions/studentAction";
import { registerTeachers } from "../../actions/teacherAction";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../Images/Profile.png";
import { State } from "country-state-city";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import "./Register.css";
import Loader from "../Loader/Loader";

const Register = () => {
  const dispatch = useDispatch();

  const {
    loading: studentLoading,
    message: studentMessage,
    error,
  } = useSelector((state) => state.acceptingRejectingStudentTeacherApproval);

  const categoriesOfUser = ["Student", "Teacher"];
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (studentMessage) {
      toast.success(studentMessage);
    }
  }, [studentMessage, error]);

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
    departmentStudent: "",
    courseStudent: "",
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
    departmentStudent,
    courseStudent,
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
    employeeID: "",
    emailTeacher: "",
    nameTeacher: "",
    genderTeacher: "",
    mobileNumberTeacher: "",
    departmentTeacher: "",
    designationTeacher: "",
    // dateOfBirthTeacher: "",
    qualificationTeacher: "",
    // assignSubjectTeacher: [],
    resumeTeacher: "",
    profilePhotoTeacher: "",
    signatureTeacher: "",
    passwordTeacher: "",
    confirmPasswordTeacher: "",
  });
  const {
    employeeID,
    emailTeacher,
    nameTeacher,
    genderTeacher,
    mobileNumberTeacher,
    departmentTeacher,
    designationTeacher,
    // dateOfBirthTeacher,
    qualificationTeacher,
    // assignSubjectTeacher,
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
  const [resumeFileTeacher, setResumeFileTeacher] = useState();
  const [resumePreviewTeacher, setResumePreviewTeacher] = useState("");
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
  const courses = ["Bachelor's Of Technology"];

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
      setResumePreviewTeacher(e.target.value);
    } else {
      setTeacher({ ...teacher, [e.target.name]: e.target.value });
    }
  };

  const registerStudentDetails = (e) => {
    e.preventDefault();

    if (enrollmentNo.trim() === "") {
      return toast.error("Fill the enrollment number");
    }
    if (rollNoStudent.trim() === "") {
      return toast.error("Fill the roll number");
    }
    if (nameStudent.trim() === "") {
      return toast.error("Fill the name");
    }
    if (fatherNameStudent.trim() === "") {
      return toast.error("Fill the father's name");
    }
    if (motherNameStudent.trim() === "") {
      return toast.error("Fill the mother's name");
    }
    if (currentSemesterStudent.trim() === "") {
      return toast.error("Select current semester");
    }
    if (emailStudent.trim() === "") {
      return toast.error("Fill the email");
    }
    if (
      mobileNumberStudent.trim() === "" ||
      mobileNumberStudent.length !== 10
    ) {
      return toast.error("Fill the mobile number properly");
    }
    if (
      fatherMobileNumberStudent.trim() === "" ||
      fatherMobileNumberStudent.length !== 10
    ) {
      return toast.error("Fill the father's mobile number properly");
    }
    if (
      motherMobileNumberStudent.trim() === "" ||
      motherMobileNumberStudent.length !== 10
    ) {
      return toast.error("Fill the mother's mobile number properly");
    }
    if (genderStudent.trim() === "") {
      return toast.error("Select your gender");
    }
    if (departmentStudent.trim() === "") {
      return toast.error("Select your department");
    }
    if (courseStudent.trim() === "") {
      return toast.error("Select your course");
    }
    if (religionStudent.trim() === "") {
      return toast.error("Select your religion");
    }
    if (categoryStudent.trim() === "") {
      return toast.error("Select your category");
    }
    if (physicallyHandicappedStudent.trim() === "") {
      return toast.error("Select your handicapped status");
    }
    if (
      aadharNumberStudent.trim() === "" ||
      aadharNumberStudent.length !== 12
    ) {
      return toast.error("Fill the aadhar number properly");
    }
    if (hostelerStudent.trim() === "") {
      return toast.error("Select your hosteler identity");
    }
    if (localAddressStudent.trim() === "") {
      return toast.error("Fill your local address properly");
    }
    if (localStateStudent.trim() === "") {
      return toast.error("Fill your local address properly");
    }
    if (localPinCodeStudent.trim() === "" || localPinCodeStudent.length !== 6) {
      return toast.error("Pin Code should be of 6 length");
    }
    if (permanentAddressStudent.trim() === "") {
      return toast.error("Fill your permanent address properly");
    }
    if (permanentStateStudent.trim() === "") {
      return toast.error("Fill your permanent address properly");
    }
    if (
      permanentPinCodeStudent.trim() === "" ||
      permanentPinCodeStudent.length !== 6
    ) {
      return toast.error("Pin Code should be of 6 length");
    }
    if (
      avatarStudent.trim() === "/static/media/Profile.5c163bc80773d22cc37a.png"
    ) {
      return toast.error("Upload your photo");
    }
    if (
      signatureAvatarStudent.trim() ===
      "/static/media/Profile.5c163bc80773d22cc37a.png"
    ) {
      return toast.error("Upload your signature");
    }
    if (passwordStudent.trim() === "" || passwordStudent.length < 8) {
      return toast.error("Password should be minimum of 8 characters");
    }
    if (
      confirmPasswordStudent.trim() === "" ||
      confirmPasswordStudent.length < 8
    ) {
      return toast.error("Password should be minimum of 8 characters");
    }
    if (passwordStudent.trim() !== confirmPasswordStudent.trim()) {
      return toast.error("Password does not match");
    }

    //FIXING FORMAT OF DATE OF BIRTH/JOINING
    if (dateOfBirthStudent === undefined) {
      return toast.error("Please select date of birth");
    }
    if (dateOfJoiningStudent === undefined) {
      return toast.error("Please select date of joining");
    }
    const updatedDateOfBirth = dateOfBirthStudent.$d;
    const updatedDateOfJoining = dateOfJoiningStudent.$d;

    dispatch(
      registerStudents(
        enrollmentNo.trim(),
        rollNoStudent.trim(),
        nameStudent.trim(),
        fatherNameStudent.trim(),
        motherNameStudent.trim(),
        currentSemesterStudent.trim(),
        emailStudent.trim(),
        mobileNumberStudent.trim(),
        fatherMobileNumberStudent.trim(),
        motherMobileNumberStudent.trim(),
        genderStudent.trim(),
        departmentStudent.trim(),
        courseStudent.trim(),
        updatedDateOfBirth,
        updatedDateOfJoining,
        religionStudent.trim(),
        bloodGroupStudent.trim(),
        categoryStudent.trim(),
        physicallyHandicappedStudent.trim(),
        aadharNumberStudent.trim(),
        hostelerStudent.trim(),
        localAddressStudent.trim(),
        localStateStudent.trim(),
        localPinCodeStudent.trim(),
        permanentAddressStudent.trim(),
        permanentStateStudent.trim(),
        permanentPinCodeStudent.trim(),
        avatarStudent.trim(),
        signatureAvatarStudent.trim(),
        passwordStudent.trim(),
        confirmPasswordStudent.trim()
      )
    );
  };
  const registerTeacherDetails = (e) => {
    e.preventDefault();

    if (employeeID.trim() === "") {
      return toast.error("Fill the employeeID");
    }
    if (emailTeacher.trim() === "") {
      return toast.error("Fill the email");
    }
    if (nameTeacher.trim() === "") {
      return toast.error("Fill the name");
    }
    if (genderTeacher.trim() === "") {
      return toast.error("Select the gender");
    }
    if (
      mobileNumberTeacher.trim() === "" ||
      mobileNumberTeacher.length !== 10
    ) {
      return toast.error("Fill the mobile number properly");
    }
    if (departmentTeacher.trim() === "") {
      return toast.error("Select your department");
    }
    if (designationTeacher.trim() === "") {
      return toast.error("Select your designation");
    }
    if (qualificationTeacher.trim() === "") {
      return toast.error("Fill the qualification");
    }
    if (assignedSubject.length === 0) {
      return toast.error("Fill the assigned subject");
    }
    if (resumeFileTeacher.trim() === "") {
      return toast.error("Upload your resume");
    }
    if (
      avatarTeacher.trim() === "/static/media/Profile.5c163bc80773d22cc37a.png"
    ) {
      return toast.error("Upload your photo");
    }
    if (
      signatureAvatarTeacher.trim() ===
      "/static/media/Profile.5c163bc80773d22cc37a.png"
    ) {
      return toast.error("Upload your signature");
    }
    if (passwordTeacher.trim() === "" || passwordTeacher.length < 8) {
      return toast.error("Password should be minimum of 8 characters");
    }
    if (confirmPasswordTeacher.trim() === "") {
      return toast.error("Password should be minimum of 8 characters");
    }
    if (passwordTeacher.trim() !== confirmPasswordTeacher.trim()) {
      return toast.error("Password does not match");
    }

    //FIXING FORMAT OF DATE OF BIRTH
    const updatedDateOfBirth = dateOfBirthTeacher.$d;

    dispatch(
      registerTeachers(
        employeeID.trim(),
        emailTeacher.trim(),
        nameTeacher.trim(),
        genderTeacher.trim(),
        mobileNumberTeacher.trim(),
        departmentTeacher.trim(),
        designationTeacher.trim(),
        updatedDateOfBirth,
        qualificationTeacher.trim(),
        assignedSubject,
        resumeFileTeacher.trim(),
        avatarTeacher.trim(),
        signatureAvatarTeacher.trim(),
        passwordTeacher.trim(),
        confirmPasswordTeacher.trim()
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

  const [assignedSubject, setAssignedSubject] = useState(inputArr);

  const addInput = () => {
    setAssignedSubject((s) => {
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
    setAssignedSubject((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <Fragment>
      {studentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="register">
            <div className="heading">
              {!registerStudent && !registerTeacher && <h2>Register</h2>}
              {registerStudent && !registerTeacher && (
                <h2>Register as Student</h2>
              )}
              {!registerStudent && registerTeacher && (
                <h2>Register as Teacher</h2>
              )}
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
                    type="number"
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
                    type="number"
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
                    placeholder="Mother's Mobile Number"
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
                  <select
                    required
                    name="departmentStudent"
                    onChange={registerStudentDataChange}>
                    <option value={departmentStudent}>Department</option>
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
                    name="courseStudent"
                    onChange={registerStudentDataChange}>
                    <option value={courseStudent}>Courses</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
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
                    type="number"
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
                    type="text"
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
                    onChange={registerStudentDataChange}
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

            {/* TEACHER */}
            {registerTeacher && (
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Employee ID"
                    required
                    name="employeeID"
                    value={employeeID}
                    onChange={registerTeacherDataChange}
                  />
                </div>
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
                    onChange={registerTeacherDataChange}>
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
                    onChange={registerTeacherDataChange}>
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
                    onChange={registerTeacherDataChange}
                  />
                </div>
                <div>
                  <h3>Assigned Subject</h3>
                  <button onClick={addInput}>Add another field</button>
                  {assignedSubject.map((item, i) => {
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
                    accept=".pdf"
                    onChange={registerTeacherDataChange}
                  />
                </div>
                <div>
                  <p>{resumePreviewTeacher}</p>
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
      )}
    </Fragment>
  );
};

export default Register;
