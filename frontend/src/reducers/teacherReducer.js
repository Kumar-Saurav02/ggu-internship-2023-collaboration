import {
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  LOGIN_TEACHER_REQUEST,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
} from "../constants/teacherConstant";

export const registerLoginTeachersReducer = (
  state = { teacher: {} },
  action
) => {
  switch (action.type) {
    case REGISTER_TEACHER_REQUEST:
    case LOGIN_TEACHER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_TEACHER_SUCCESS:
    case LOGIN_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_TEACHER_FAIL:
    case LOGIN_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
