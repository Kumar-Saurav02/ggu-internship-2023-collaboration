import {
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  LOGIN_TEACHER_REQUEST,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOAD_TEACHER_REQUEST,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAIL,
} from "../constants/teacherConstant";
import axios from "axios";

//TEACHER REGISTER
export const registerTeachers =
  (
    email,
    name,
    password,
    confirmPassword,
    gender,
    mobileNumber,
    profilePhoto
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_TEACHER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/registerTeacher`,
        {
          email,
          name,
          password,
          confirmPassword,
          gender,
          mobileNumber,
          profilePhoto,
        },
        config
      );

      dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_TEACHER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TEACHER LOGIN
export const loginTeachers = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_TEACHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/loginTeacher`,
      {
        email,
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

// LOAD TEACHER
export const loadTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_TEACHER_REQUEST });

    const { data } = await axios.get(`/api/getTeacherDetail`);

    dispatch({ type: LOAD_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_TEACHER_FAIL, payload: error.response.data.message });
  }
};
