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
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registerTeacher").post(registerTeacher);
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").get(logout);
router.route("/updateTeacher").put(isAuthenticatedUser, updateDetailsTeacher);
router.route("/getAllTeachers").get(isAuthenticatedUser, getAllTeachers); //Admin
router
  .route("/getParticularTeacher")
  .get(isAuthenticatedUser, getParticularTeacher); // Admin
router.route("/getTeacherDetail").get(isAuthenticatedUser, getTeacher);

module.exports = router;
