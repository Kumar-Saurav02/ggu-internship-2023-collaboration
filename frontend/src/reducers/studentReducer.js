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

export const registerLoginStudentsReducer = (
  state = { student: {} },
  action
) => {
  switch (action.type) {
    case REGISTER_STUDENT_REQUEST:
    case LOGIN_STUDENT_REQUEST:
    case LOAD_STUDENT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_STUDENT_SUCCESS:
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
    case REGISTER_STUDENT_FAIL:
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
    default:
      return state;
  }
};
