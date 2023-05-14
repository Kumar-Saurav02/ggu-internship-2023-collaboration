const express = require("express");
const {
  registerStudent,
  loginStudent,
  logout,
} = require("../controllers/studentController");
const router = express.Router();

router.route("/registerStudent").post(registerStudent);
router.route("loginStudent").post(loginStudent);
router.route("logoutStudent").get(logout);

module.exports = router;
