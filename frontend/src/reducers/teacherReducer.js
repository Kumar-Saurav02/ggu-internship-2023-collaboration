import { CLEAR_MESSAGES } from "../constants/adminConstant";
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

export const registerLoginTeachersReducer = (
  state = { teacher: {} },
  action
) => {
  switch (action.type) {
    case LOGIN_TEACHER_REQUEST:
    case LOAD_TEACHER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_TEACHER_SUCCESS:
    case LOAD_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        teacher: action.payload,
      };
    case LOGOUT_TEACHER_SUCCESS:
      return {
        loading: false,
        teacher: null,
        isAuthenticated: false,
      };
    case LOGIN_TEACHER_FAIL:
    case LOAD_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        teacher: null,
        error: action.payload,
      };
    case LOGOUT_TEACHER_FAIL:
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
