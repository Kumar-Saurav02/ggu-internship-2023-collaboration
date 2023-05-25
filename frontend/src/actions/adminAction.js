import {
    GET_STUDENT_APPROVAL_FAIL,
    GET_STUDENT_APPROVAL_REQUEST,
    GET_STUDENT_APPROVAL_SUCCESS,
    STUDENT_APPROVAL_ACCEPT_REQUEST,
    STUDENT_APPROVAL_ACCEPT_SUCCESS,
    STUDENT_APPROVAL_ACCEPT_FAIL,
    STUDENT_APPROVAL_REJECT_REQUEST,
    STUDENT_APPROVAL_REJECT_SUCCESS,
    STUDENT_APPROVAL_REJECT_FAIL,
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
  import axios from "axios";
  
  //STUDENT APPROVAL
  export const studentApprovalRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_STUDENT_APPROVAL_REQUEST });
  
      const { data } = await axios.get(`/api/getAllRequestsStudents`);
  
      dispatch({
        type: GET_STUDENT_APPROVAL_SUCCESS,
        payload: data.requests,
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_APPROVAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //STUDENT APPROVAL ACCEPT
  export const studentApprovalRequestAccept = (id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_APPROVAL_ACCEPT_REQUEST });
  
      const { data } = await axios.post(`/api/registerStudentAccept/${id}`);
  
      dispatch({
        type: STUDENT_APPROVAL_ACCEPT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_APPROVAL_ACCEPT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //STUDENT APPROVAL REJECT
  export const studentApprovalRequestReject = (id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_APPROVAL_REJECT_REQUEST });
  
      const { data } = await axios.delete(`/api/rejectApprovalStudent/${id}`);
  
      dispatch({
        type: STUDENT_APPROVAL_REJECT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_APPROVAL_REJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //TEACHER APPROVAL
  export const teacherApprovalRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TEACHER_APPROVAL_REQUEST });
  
      const { data } = await axios.get(`/api/getAllRequestsTeachers`);
  
      dispatch({
        type: GET_TEACHER_APPROVAL_SUCCESS,
        payload: data.requests,
      });
    } catch (error) {
      dispatch({
        type: GET_TEACHER_APPROVAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //TEACHER APPROVAL ACCEPT
  export const teacherApprovalRequestAccept = (id) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_APPROVAL_ACCEPT_REQUEST });
  
      const { data } = await axios.post(`/api/registerTeacherAccept/${id}`);
  
      dispatch({
        type: TEACHER_APPROVAL_ACCEPT_SUCCESS,
        payload: data.requests,
      });
    } catch (error) {
      dispatch({
        type: TEACHER_APPROVAL_ACCEPT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //TEACHER APPROVAL REJECT
  export const teacherApprovalRequestReject = (id) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_APPROVAL_REJECT_REQUEST });
  
      const { data } = await axios.delete(`/api/registerTeacherAccept/${id}`);
  
      dispatch({
        type: TEACHER_APPROVAL_REJECT_SUCCESS,
        payload: data.requests,
      });
    } catch (error) {
      dispatch({
        type: TEACHER_APPROVAL_REJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };