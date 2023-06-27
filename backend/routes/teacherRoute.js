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
const {
  isAuthenticatedUser,
  authorizeRolesTeacher,
  authorizeSubRolesTeacher,
} = require("../middleware/auth");
const {
  fillAttendanceDetails,
  getAttendanceDetailsOfParticularSubject,
} = require("../controllers/attendanceController");
const {
  fillMarksDetails,
  getMarksDetailsOfParticularSubject,
} = require("../controllers/marksController");
const router = express.Router();

router.route("/registerApprovalTeacher").post(registerApprovalTeacher);
router
  .route("/registerTeacherAccept/:id")
  .post(
    isAuthenticatedUser,
    authorizeSubRolesTeacher("admin"),
    registerTeacherAccept
  );
router
  .route("/rejectApprovalTeacher/:id")
  .delete(
    isAuthenticatedUser,
    authorizeSubRolesTeacher("admin"),
    rejectApprovalTeacher
  );
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").get(logout);
router
  .route("/updateTeacher")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    updateDetailsTeacher
  );
router
  .route("/updateTeacherRole/:id")
  .put(
    isAuthenticatedUser,
    authorizeSubRolesTeacher("admin"),
    updateRoleOfTeacher
  );
router
  .route("/getTeacherDetail")
  .get(isAuthenticatedUser, authorizeRolesTeacher("teacher"), getTeacher);
router
  .route("/getAllTeachers")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    getAllTeachers
  );
router
  .route("/getAllRequestsTeachers")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    getAllTeachersApproval
  );
router
  .route("/getParticularTeacher")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    getParticularTeacher
  );

//HOD
router.route("/createSubject").post(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("hod"),
  createSubject
);
router.route("/createCourse").post(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("hod"),
  createCourse
);
router.route("/updateCourse").put(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("hod"),
  updateCourse
);
router.route("/getAllSubjects").get(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("hod"),
  getAllSubjects
);

//CLASS INCHARGE
router.route("/acceptCourseSelection").put(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  acceptCourseSelection
);
router.route("/rejectCourseSelection").delete(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  rejectCourseSelection
);
router.route("/acceptScholarshipSelection").put(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  acceptScholarshipSelection
);
router.route("/rejectScholarshipSelection").delete(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  rejectScholarshipSelection
);
router.route("/getAllCoursesApproval").get(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  getAllCoursesApproval
);
router.route("/getAllScholarshipsApproval").get(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("classIncharge"),
  getAllScholarshipsApproval
);

//ATTENDANCE
router.route("/attendanceEntryByTeacher").put(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("admin"),
  fillAttendanceDetails
);
router
  .route(
    "/getAttendanceDetailsOfParticularSubject/:semester/:department/:subject"
  )
  .get(getAttendanceDetailsOfParticularSubject);

//MARKS
router.route("/marksEntryByTeacher").put(fillMarksDetails);
router
  .route("/getMarksDetailsOfParticularSubject/:semester/:department/:subject")
  .get(getMarksDetailsOfParticularSubject);

module.exports = router;
