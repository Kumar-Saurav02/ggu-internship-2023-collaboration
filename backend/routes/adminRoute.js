const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { sendOtp } = require("../controllers/emailController");
const { logout } = require("../controllers/studentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);
router.route("logoutAdmin").get(logout);
router.route("/sendOtp").post(sendOtp);

module.exports = router;
