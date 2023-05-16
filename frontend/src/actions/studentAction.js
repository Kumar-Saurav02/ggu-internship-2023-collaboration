import {
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
} from "../constants/studentConstant";
import axios from "axios";

//STUDENT REGISTER
export const registerStudents = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_STUDENT_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/registerStudent`,
      studentData,
      config
    );

    dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// STUDENT LOGIN
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
