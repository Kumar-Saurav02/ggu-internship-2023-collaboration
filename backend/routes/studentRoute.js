const express = require("express");
const {
  registerStudent,
  loginStudent,
  logout,
  updateDetails,
  getAllStudents,
  getParticularStudent,
  getStudent,
  getCourseSelectionForSemester,
} = require("../controllers/studentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerStudent").post(registerStudent);
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
router
  .route("/getParticularStudent")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getParticularStudent);

module.exports = router;
