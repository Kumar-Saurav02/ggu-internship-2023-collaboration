import { CLEAR_MESSAGES } from "../constants/adminConstant";
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

//CREATE COURSE
export const createCourseByHODReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_COURSE_FAIL:
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

//CREATE SUBJECT
export const createSubjectByHODReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_SUBJECT_FAIL:
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

//GET ALL SUBJECTS
export const getAllSubjectsReducer = (state = { subjects: [] }, action) => {
  switch (action.type) {
    case GET_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
      };
    case GET_SUBJECT_FAIL:
      return {
        ...state,
        loading: false,
        subjects: null,
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
