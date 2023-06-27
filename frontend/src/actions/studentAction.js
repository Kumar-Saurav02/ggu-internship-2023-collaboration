import {
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
  LOGOUT_STUDENT_SUCCESS,
  LOGOUT_STUDENT_FAIL,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  UPDATE_DATA_BY_STUDENT_REQUEST,
  UPDATE_DATA_BY_STUDENT_SUCCESS,
  UPDATE_DATA_BY_STUDENT_FAIL,
  COURSE_STUDENT_REQUEST,
  COURSE_STUDENT_SUCCESS,
  COURSE_STUDENT_FAIL,
  SUBMIT_FEES_REQUEST,
  SUBMIT_FEES_SUCCESS,
  SUBMIT_FEES_FAIL,
  SUBMIT_MARKS_REQUEST,
  SUBMIT_MARKS_SUCCESS,
  SUBMIT_MARKS_FAIL,
  SUBMIT_COURSE_REQUEST,
  SUBMIT_COURSE_SUCCESS,
  SUBMIT_COURSE_FAIL,
  SUBMIT_SCHOLARSHIP_REQUEST,
  SUBMIT_SCHOLARSHIP_SUCCESS,
  SUBMIT_SCHOLARSHIP_FAIL,
  GET_STUDENT_SEMESTER_DEPARTMENT_REQUEST,
  GET_STUDENT_SEMESTER_DEPARTMENT_SUCCESS,
  GET_STUDENT_SEMESTER_DEPARTMENT_FAIL,
  COURSE_SUBJECT_LIST_REQUEST,
  COURSE_SUBJECT_LIST_SUCCESS,
  COURSE_SUBJECT_LIST_FAIL,
} from "../constants/studentConstant";
import {
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
} from "../constants/adminConstant";
import axios from "axios";

//STUDENT REGISTER
export const registerStudents =
  (
    enrollmentNo,
    rollNo,
    name,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
    localAddress,
    localState,
    localPinCode,
    permanentAddress,
    permanentState,
    permanentPinCode,
    avatarStudent,
    signatureAvatarStudent,
    password,
    confirmPassword
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_STUDENT_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/registerApprovalStudent`,
        {
          enrollmentNo,
          rollNo,
          name,
          fatherName,
          motherName,
          currentSemester,
          email,
          mobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          gender,
          department,
          course,
          dateOfBirth,
          dateOfJoining,
          religion,
          bloodGroup,
          category,
          physicallyHandicapped,
          aadharNumber,
          hosteler,
          localAddress,
          localState,
          localPinCode,
          permanentAddress,
          permanentState,
          permanentPinCode,
          avatarStudent,
          signatureAvatarStudent,
          password,
          confirmPassword,
        },
        config
      );

      dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: REGISTER_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//STUDENT UPDATE DATA
export const updatingDataByStudent =
  (
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    hosteler,
    profilePhoto,
    signaturePhoto
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DATA_BY_STUDENT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateStudent`,
        {
          mobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          hosteler,
          profilePhoto,
          signaturePhoto,
        },
        config
      );

      dispatch({ type: UPDATE_DATA_BY_STUDENT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_BY_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//STUDENT UPDATE COURSE
export const updatingCourseSelection = (course) => async (dispatch) => {};

//STUDENT UPLOAD FEES
export const uploadingFees =
  (
    feeSemester,
    feeBankName,
    feeAccountNumber,
    feeifscCode,
    feeAmount,
    feeChallanId,
    feeDateOfPayment,
    feeDocument
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_FEES_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateStudent`,
        {
          feeSemester,
          feeBankName,
          feeAccountNumber,
          feeifscCode,
          feeAmount,
          feeChallanId,
          feeDateOfPayment,
          feeDocument,
        },
        config
      );

      dispatch({ type: SUBMIT_FEES_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: SUBMIT_FEES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//STUDENT UPLOAD MARKS
export const uploadingMarks =
  (marksSemester, marksSGPA, marksCGPA, marksResult) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_MARKS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateStudent`,
        {
          marksSemester,
          marksSGPA,
          marksCGPA,
          marksResult,
        },
        config
      );

      dispatch({ type: SUBMIT_MARKS_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: SUBMIT_MARKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//SUBMIT STUDENT COURSE
export const submitCourse = (courseSubmission) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_COURSE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/updateStudent`,
      { courseSubmission },
      config
    );

    dispatch({ type: SUBMIT_COURSE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: SUBMIT_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//SUBMIT STUDENT SCHOLARSHIP
export const submitScholarship =
  (
    scholarshipSession,
    scholarshipState,
    scholarshipName,
    scholarshipDocument
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_SCHOLARSHIP_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateStudent`,
        {
          scholarshipSession,
          scholarshipState,
          scholarshipName,
          scholarshipDocument,
        },
        config
      );

      dispatch({ type: SUBMIT_SCHOLARSHIP_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: SUBMIT_SCHOLARSHIP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//STUDENT LOGIN
export const loginStudents =
  (enrollmentNumber, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_STUDENT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/loginStudent`,
        { enrollmentNumber, password },
        config
      );

      dispatch({ type: LOGIN_STUDENT_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: LOGIN_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// LOGOUT STUDENT
export const logoutStudent = () => async (dispatch) => {
  try {
    await axios.get(`/api/logoutStudent`);

    dispatch({ type: LOGOUT_STUDENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//LOAD STUDENT
export const loadStudent = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_STUDENT_REQUEST });

    const { data } = await axios.get(`/api/getStudentDetail`);

    dispatch({ type: LOAD_STUDENT_SUCCESS, payload: data.student });
  } catch (error) {
    dispatch({ type: LOAD_STUDENT_FAIL, payload: error.response.data.message });
  }
};

//GET COURSE FOR STUDENT
export const getCourseForStudent = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_STUDENT_REQUEST });

    const { data } = await axios.get(`/api/getCourseForSelection`);

    dispatch({ type: COURSE_STUDENT_SUCCESS, payload: data.course });
  } catch (error) {
    dispatch({
      type: COURSE_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET STUDENT BASED ON SEMESTER AND DEPARTMENT
export const getStudentSemesterDepartment =
  (semester, department) => async (dispatch) => {
    try {
      dispatch({ type: GET_STUDENT_SEMESTER_DEPARTMENT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(
        `/api/studentsBasedOnSemesterAndDepartment/${semester}/${department}`,
        { semester, department },
        config
      );

      dispatch({
        type: GET_STUDENT_SEMESTER_DEPARTMENT_SUCCESS,
        payload: data.students,
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_SEMESTER_DEPARTMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET COURSE SUBJECT LISTS
export const getCourseSubjectsList =
  (semester, department) => async (dispatch) => {
    try {
      dispatch({ type: COURSE_SUBJECT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/getCourseSubjectsList/${semester}/${department}`
      );

      dispatch({ type: COURSE_SUBJECT_LIST_SUCCESS, payload: data.subjects });
    } catch (error) {
      dispatch({
        type: COURSE_SUBJECT_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
