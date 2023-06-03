import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAIL,
} from "../constants/hodConstant";
import axios from "axios";

//CREATE COURSE
export const createCourseByHOD = (semester, courses) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/createCourse`,
      { semester, courses },
      config
    );

    dispatch({ type: CREATE_COURSE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CREATE SUBJECT
export const createSubjectByHOD =
  (subjectName, subjectCode, subjectCredit) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUBJECT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/createSubject`,
        { subjectName, subjectCode, subjectCredit },
        config
      );

      dispatch({ type: CREATE_SUBJECT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_SUBJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL SUBJECTS
export const getAllSubjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECT_REQUEST });

    const { data } = await axios.get(`/api/getAllSubjects`);

    dispatch({ type: GET_SUBJECT_SUCCESS, payload: data.subjects });
  } catch (error) {
    dispatch({ type: GET_SUBJECT_FAIL, payload: error.response.data.message });
  }
};
