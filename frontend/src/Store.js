import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getCourseForStudentReducer,
  getCourseSubjectsListReducer,
  getStudentsBaseOnSemesterAndDepartmentReducer,
  marksFeesCourseUpdateReducer,
  registerLoginStudentsReducer,
} from "./reducers/studentReducer";
import {
  courseScholarshipCheckReducer,
  getCoursesForApprovalReducer,
  getScholarshipsForApprovalReducer,
  registerLoginTeachersReducer,
  submitAttendanceEntryBySubjectTeacherReducer,
} from "./reducers/teacherReducer";
import {
  acceptingRejectingStudentTeacherApprovalReducer,
  getAllTeacherDetailsReducer,
  getStudentApprovalRequestReducer,
  getTeacherApprovalRequestReducer,
  updateTeacherRoleReducer,
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
  updateTeacherRole: updateTeacherRoleReducer,
  getAllTeacherDetails: getAllTeacherDetailsReducer,
  courseScholarshipCheck: courseScholarshipCheckReducer,
  getCoursesForApproval: getCoursesForApprovalReducer,
  getScholarshipsForApproval: getScholarshipsForApprovalReducer,
  getStudentsBaseOnSemesterAndDepartment:
    getStudentsBaseOnSemesterAndDepartmentReducer,
  getCourseSubjectsList: getCourseSubjectsListReducer,
  submitAttendanceEntryBySubjectTeacher:
    submitAttendanceEntryBySubjectTeacherReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
