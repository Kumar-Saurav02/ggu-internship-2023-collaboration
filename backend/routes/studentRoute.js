const express = require("express");
const {
  studentsBasedOnSemesterAndDepartment,
} = require("../controllers/attendanceController");
const {
  registerStudentAccept,
  loginStudent,
  logout,
  updateDetails,
  getAllStudents,
  getParticularStudent,
  getStudent,
  getCourseSelectionForSemester,
  registerApprovalStudent,
  rejectApprovalStudent,
  getAllStudentsApproval,
  getCourseSubjectList,
} = require("../controllers/studentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerApprovalStudent").post(registerApprovalStudent);
router.route("/registerStudentAccept/:id").post(registerStudentAccept);
router.route("/rejectApprovalStudent/:id").delete(rejectApprovalStudent);
router.route("/loginStudent").post(loginStudent);
router.route("/logoutStudent").get(logout);
router.route("/updateStudent").put(updateDetails);
router.route("/getStudentDetail").get(isAuthenticatedUser, getStudent);
router
  .route("/getCourseForSelection")
  .get(isAuthenticatedUser, getCourseSelectionForSemester);
router.route("/getAllStudents").get(getAllStudents);
router.route("/getAllRequestsStudents").get(getAllStudentsApproval);
router.route("/getParticularStudent").get(getParticularStudent);
router
  .route("/studentsBasedOnSemesterAndDepartment/:semester/:department")
  .get(studentsBasedOnSemesterAndDepartment);
router
  .route("/getCourseSubjectsList/:semester/:department")
  .get(isAuthenticatedUser, getCourseSubjectList);

module.exports = router;
