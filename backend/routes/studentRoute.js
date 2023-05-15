const express = require("express");
const {
  registerStudent,
  loginStudent,
  logout,
  updateDetails,
  getAllStudents,
  getParticularStudent,
  getStudent,
} = require("../controllers/studentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registerStudent").post(registerStudent);
router.route("/loginStudent").post(loginStudent);
router.route("/logoutStudent").get(logout);
router.route("/updateStudent").put(isAuthenticatedUser, updateDetails);
router.route("/getAllStudents").get(isAuthenticatedUser, getAllStudents); //Admin
router
  .route("/getParticularStudent")
  .get(isAuthenticatedUser, getParticularStudent); // Admin
router.route("/getMyDetail").get(isAuthenticatedUser, getStudent);

module.exports = router;
