import {
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
  LOGOUT_STUDENT_SUCCESS,
  LOGOUT_STUDENT_FAIL,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  COURSE_STUDENT_REQUEST,
  COURSE_STUDENT_SUCCESS,
  COURSE_STUDENT_FAIL,
} from "../constants/studentConstant";
import axios from "axios";

//STUDENT REGISTER
export const registerStudents =
  (enrollmentNumber, name, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_STUDENT_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/registerStudent`,
        { enrollmentNumber, name, password, confirmPassword },
        config
      );

      dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data.student });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: REGISTER_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//STUDENT LOGIN
export const loginStudents =
  (enrollmentNumber, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_STUDENT_REQUEST });
      console.log(enrollmentNumber + " " + password);

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/loginStudent`,
        { enrollmentNumber, password },
        config
      );

      dispatch({ type: LOGIN_STUDENT_SUCCESS, payload: data.student });
    } catch (error) {
      dispatch({
        type: LOGIN_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Logout STUDENT
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
