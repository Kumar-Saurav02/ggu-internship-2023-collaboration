import {
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
  GET_STUDENT_APPROVAL_FAIL,
  GET_STUDENT_APPROVAL_REQUEST,
  GET_STUDENT_APPROVAL_SUCCESS,
  STUDENT_APPROVAL_ACCEPT_REQUEST,
  STUDENT_APPROVAL_ACCEPT_SUCCESS,
  STUDENT_APPROVAL_ACCEPT_FAIL,
  STUDENT_APPROVAL_REJECT_REQUEST,
  STUDENT_APPROVAL_REJECT_SUCCESS,
  STUDENT_APPROVAL_REJECT_FAIL,
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  GET_TEACHER_APPROVAL_FAIL,
  GET_TEACHER_APPROVAL_REQUEST,
  GET_TEACHER_APPROVAL_SUCCESS,
  TEACHER_APPROVAL_ACCEPT_REQUEST,
  TEACHER_APPROVAL_ACCEPT_SUCCESS,
  TEACHER_APPROVAL_ACCEPT_FAIL,
  TEACHER_APPROVAL_REJECT_REQUEST,
  TEACHER_APPROVAL_REJECT_SUCCESS,
  TEACHER_APPROVAL_REJECT_FAIL,
  CLEAR_MESSAGES,
  UPDATE_TEACHER_ROLE_REQUEST,
  UPDATE_TEACHER_ROLE_SUCCESS,
  UPDATE_TEACHER_ROLE_FAIL,
  GET_ALL_TEACHER_REQUEST,
  GET_ALL_TEACHER_SUCCESS,
  GET_ALL_TEACHER_FAIL,
} from "../constants/adminConstant";

//GET ALL STUDENTS APPROVAL REQUESTS
export const getStudentApprovalRequestReducer = (
  state = { studentApproval: [] },
  action
) => {
  switch (action.type) {
    case GET_STUDENT_APPROVAL_REQUEST:
      return {
        loading: true,
      };
    case GET_STUDENT_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        studentApproval: action.payload,
      };
    case GET_STUDENT_APPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        studentApproval: null,
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

//GET ALL TEACHERS APPROVAL REQUESTS
export const getTeacherApprovalRequestReducer = (
  state = { teacherApproval: [] },
  action
) => {
  switch (action.type) {
    case GET_TEACHER_APPROVAL_REQUEST:
      return {
        loading: true,
      };
    case GET_TEACHER_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        teacherApproval: action.payload,
      };
    case GET_TEACHER_APPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        teacherApproval: null,
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

//APPROVAL ACCEPT AND REJECT
export const acceptingRejectingStudentTeacherApprovalReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case REGISTER_STUDENT_REQUEST:
    case REGISTER_TEACHER_REQUEST:
    case STUDENT_APPROVAL_ACCEPT_REQUEST:
    case STUDENT_APPROVAL_REJECT_REQUEST:
    case TEACHER_APPROVAL_ACCEPT_REQUEST:
    case TEACHER_APPROVAL_REJECT_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_STUDENT_SUCCESS:
    case REGISTER_TEACHER_SUCCESS:
    case STUDENT_APPROVAL_ACCEPT_SUCCESS:
    case STUDENT_APPROVAL_REJECT_SUCCESS:
    case TEACHER_APPROVAL_ACCEPT_SUCCESS:
    case TEACHER_APPROVAL_REJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case REGISTER_STUDENT_FAIL:
    case REGISTER_TEACHER_FAIL:
    case STUDENT_APPROVAL_ACCEPT_FAIL:
    case STUDENT_APPROVAL_REJECT_FAIL:
    case TEACHER_APPROVAL_ACCEPT_FAIL:
    case TEACHER_APPROVAL_REJECT_FAIL:
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

//UPDATE TEACHER ROLE
export const updateTeacherRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEACHER_ROLE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_TEACHER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case UPDATE_TEACHER_ROLE_FAIL:
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

//GET ALL TEACHER DETAILS
export const getAllTeacherDetailsReducer = (
  state = { teachers: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_TEACHER_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.payload,
      };
    case GET_ALL_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        teachers: null,
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
