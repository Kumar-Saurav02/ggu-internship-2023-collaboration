import {
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
} from "../constants/studentConstant";

export const registerLoginStudentsReducer = (
  state = { student: {} },
  action
) => {
  switch (action.type) {
    case REGISTER_STUDENT_REQUEST:
    case LOGIN_STUDENT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_STUDENT_SUCCESS:
    case LOGIN_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_STUDENT_FAIL:
    case LOGIN_STUDENT_FAIL:
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
