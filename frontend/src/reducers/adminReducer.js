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
      default:
        return state;
    }
  };
  
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
      default:
        return state;
    }
  };