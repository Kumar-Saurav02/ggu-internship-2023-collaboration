import { CLEAR_MESSAGES } from "../constants/adminConstant";
import {
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
  SUBMIT_FEES_REQUEST,
  SUBMIT_FEES_SUCCESS,
  SUBMIT_FEES_FAIL,
  SUBMIT_MARKS_REQUEST,
  SUBMIT_MARKS_SUCCESS,
  SUBMIT_MARKS_FAIL,
} from "../constants/studentConstant";

export const registerLoginStudentsReducer = (
  state = { student: {} },
  action
) => {
  switch (action.type) {
    case LOGIN_STUDENT_REQUEST:
    case LOAD_STUDENT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_STUDENT_SUCCESS:
    case LOAD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        student: action.payload,
      };
    case LOGOUT_STUDENT_SUCCESS:
      return {
        loading: false,
        student: null,
        isAuthenticated: false,
      };

    case LOGIN_STUDENT_FAIL:
    case LOAD_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        student: null,
        error: action.payload,
      };
    case LOGOUT_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getCourseForStudentReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_STUDENT_REQUEST:
      return {
        loading: true,
      };
    case COURSE_STUDENT_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        course: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const marksFeesUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case SUBMIT_FEES_REQUEST:
    case SUBMIT_MARKS_REQUEST:
      return {
        loading: true,
      };
    case SUBMIT_FEES_SUCCESS:
    case SUBMIT_MARKS_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case SUBMIT_FEES_FAIL:
    case SUBMIT_MARKS_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};
