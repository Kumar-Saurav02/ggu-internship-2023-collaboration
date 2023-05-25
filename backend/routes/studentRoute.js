const express = require("express");
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
} = require("../controllers/studentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerApprovalStudent").post(registerApprovalStudent);
router.route("/registerStudentAccept/:id").post(registerStudentAccept);
router.route("/rejectApprovalStudent/:id").delete(rejectApprovalStudent);
router.route("/loginStudent").post(loginStudent);
router.route("/logoutStudent").get(logout);
router
  .route("/updateStudent")
  .put(isAuthenticatedUser, authorizeRoles("student"), updateDetails);
router
  .route("/getStudentDetail")
  .get(isAuthenticatedUser, authorizeRoles("student"), getStudent);
router
  .route("/getCourseForSelection")
  .get(
    isAuthenticatedUser,
    authorizeRoles("student"),
    getCourseSelectionForSemester
  );
router
  .route("/getAllStudents")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllStudents);
router.route("/getAllRequestsStudents").get(
  // isAuthenticatedUser,
  //  authorizeRoles("admin"),
  getAllStudentsApproval
);
router
  .route("/getParticularStudent")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getParticularStudent);

module.exports = router;