const express = require("express");
const { logout } = require("../controllers/studentController");
const {
  registerTeacher,
  loginTeacher,
  updateDetailsTeacher,
  getAllTeachers,
  getParticularTeacher,
  getTeacher,
} = require("../controllers/teacherController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerTeacher").post(registerTeacher);
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").get(logout);
router
  .route("/updateTeacher")
  .put(isAuthenticatedUser, authorizeRoles("teacher"), updateDetailsTeacher);
router
  .route("/getTeacherDetail")
  .get(isAuthenticatedUser, authorizeRoles("teacher"), getTeacher);
router
  .route("/getAllTeachers")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllTeachers);
router
  .route("/getParticularTeacher")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getParticularTeacher);

module.exports = router;
