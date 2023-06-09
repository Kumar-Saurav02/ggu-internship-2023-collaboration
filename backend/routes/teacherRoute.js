const express = require("express");
const { logout } = require("../controllers/studentController");
const {
  registerTeacherAccept,
  loginTeacher,
  updateDetailsTeacher,
  getAllTeachers,
  getParticularTeacher,
  getTeacher,
  registerApprovalTeacher,
  rejectApprovalTeacher,
  getAllTeachersApproval,
  updateRoleOfTeacher,
  acceptCourseSelection,
  rejectCourseSelection,
  acceptScholarshipSelection,
  rejectScholarshipSelection,
  getAllCoursesApproval,
  getAllScholarshipsApproval,
} = require("../controllers/teacherController");
const {
  createSubject,
  createCourse,
  updateCourse,
  getAllSubjects,
} = require("../controllers/hodController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  fillAttendanceDetails,
} = require("../controllers/attendanceController");
const router = express.Router();

router.route("/registerApprovalTeacher").post(registerApprovalTeacher);
router.route("/registerTeacherAccept/:id").post(registerTeacherAccept);
router.route("/rejectApprovalTeacher/:id").delete(rejectApprovalTeacher);
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").get(logout);
router.route("/updateTeacher").put(updateDetailsTeacher);
router.route("/updateTeacherRole/:id").put(updateRoleOfTeacher);
router
  .route("/getTeacherDetail")
  .get(isAuthenticatedUser, authorizeRoles("teacher"), getTeacher);
router.route("/getAllTeachers").get(getAllTeachers);
router.route("/getAllRequestsTeachers").get(getAllTeachersApproval);
router.route("/getParticularTeacher").get(getParticularTeacher);

//HOD
router.route("/createSubject").post(createSubject);
router.route("/createCourse").post(createCourse);
router.route("/updateCourse").put(updateCourse);
router.route("/getAllSubjects").get(getAllSubjects);

//CLASS INCHARGE
router.route("/acceptCourseSelection").put(acceptCourseSelection);
router.route("/rejectCourseSelection").delete(rejectCourseSelection);
router.route("/acceptScholarshipSelection").put(acceptScholarshipSelection);
router.route("/rejectScholarshipSelection").delete(rejectScholarshipSelection);
router.route("/getAllCoursesApproval").get(getAllCoursesApproval);
router.route("/getAllScholarshipsApproval").get(getAllScholarshipsApproval);

//ATTENDANCE
router.route("/attendanceEntryByTeacher").put(fillAttendanceDetails);

module.exports = router;
