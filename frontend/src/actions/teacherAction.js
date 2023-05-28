import {
  LOGIN_TEACHER_REQUEST,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOAD_TEACHER_REQUEST,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAIL,
  LOGOUT_TEACHER_SUCCESS,
  LOGOUT_TEACHER_FAIL,
} from "../constants/teacherConstant";
import {
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
} from "../constants/adminConstant";
import axios from "axios";

//TEACHER REGISTER
export const registerTeachers =
  (
    employeeID,
    email,
    name,
    gender,
    mobileNumber,
    department,
    designation,
    dateOfBirth,
    qualification,
    assignSubject,
    resume,
    profilePhoto,
    signature,
    password,
    confirmPassword
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_TEACHER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/registerApprovalTeacher`,
        {
          employeeID,
          email,
          name,
          gender,
          mobileNumber,
          department,
          designation,
          dateOfBirth,
          qualification,
          assignSubject,
          resume,
          profilePhoto,
          signature,
          password,
          confirmPassword,
        },
        config
      );

      dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: REGISTER_TEACHER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TEACHER LOGIN
export const loginTeachers = (employeeID, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_TEACHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/loginTeacher`,
      {
        employeeID,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_TEACHER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout STUDENT
export const logoutTeacher = () => async (dispatch) => {
  try {
    await axios.get(`/api/logoutStudent`);

    dispatch({ type: LOGOUT_TEACHER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LOAD TEACHER
export const loadTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_TEACHER_REQUEST });

    const { data } = await axios.get(`/api/getTeacherDetail`);

    dispatch({ type: LOAD_TEACHER_SUCCESS, payload: data.teacher });
  } catch (error) {
    dispatch({ type: LOAD_TEACHER_FAIL, payload: error.response.data.message });
  }
};
