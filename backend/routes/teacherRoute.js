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
} = require("../controllers/teacherController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerApprovalTeacher").post(registerApprovalTeacher);
router.route("/registerTeacherAccept/:id").post(registerTeacherAccept);
router.route("/rejectApprovalTeacher/:id").delete(rejectApprovalTeacher);
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
router.route("/getAllRequestsTeachers").get(
  // isAuthenticatedUser,
  //  authorizeRoles("admin"),
  getAllTeachersApproval
);
router
  .route("/getParticularTeacher")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getParticularTeacher);

module.exports = router;
