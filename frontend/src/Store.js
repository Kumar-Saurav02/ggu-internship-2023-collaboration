import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getCourseForStudentReducer,
  marksFeesCourseUpdateReducer,
  registerLoginStudentsReducer,
} from "./reducers/studentReducer";
import { registerLoginTeachersReducer } from "./reducers/teacherReducer";
import {
  acceptingRejectingStudentTeacherApprovalReducer,
  getStudentApprovalRequestReducer,
  getTeacherApprovalRequestReducer,
} from "./reducers/adminReducer";
import {
  createCourseByHODReducer,
  createSubjectByHODReducer,
  getAllSubjectsReducer,
} from "./reducers/hodReducer";

const reducer = combineReducers({
  registerLoginStudents: registerLoginStudentsReducer,
  registerLoginTeachers: registerLoginTeachersReducer,
  courseForStudents: getCourseForStudentReducer,
  studentsApprovalRequests: getStudentApprovalRequestReducer,
  teachersApprovalRequests: getTeacherApprovalRequestReducer,
  acceptingRejectingStudentTeacherApproval:
    acceptingRejectingStudentTeacherApprovalReducer,
  createCourseByHOD: createCourseByHODReducer,
  createSubjectByHOD: createSubjectByHODReducer,
  getAllSubjects: getAllSubjectsReducer,
  marksFeesCourseUpdate: marksFeesCourseUpdateReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
