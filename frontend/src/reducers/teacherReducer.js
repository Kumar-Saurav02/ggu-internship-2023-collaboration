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

export const registerLoginTeachersReducer = (
  state = { teacher: {} },
  action
) => {
  switch (action.type) {
    case REGISTER_TEACHER_REQUEST:
    case LOGIN_TEACHER_REQUEST:
    case LOAD_TEACHER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_TEACHER_SUCCESS:
    case LOGIN_TEACHER_SUCCESS:
    case LOAD_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        teacher: action.payload,
      };
    case REGISTER_TEACHER_FAIL:
    case LOGIN_TEACHER_FAIL:
    case LOAD_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        teacher: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
