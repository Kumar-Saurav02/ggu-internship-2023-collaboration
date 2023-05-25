const express = require("express");
const {
  createSubject,
  createCourse,
  updateCourse,
  getAllSubjects,
} = require("../controllers/hodController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createSubject").post(isAuthenticatedUser, createSubject);
router.route("/createCourse").post(isAuthenticatedUser, createCourse);
router.route("/updateCourse").put(isAuthenticatedUser, updateCourse);
router.route("/getAllSubjects").get(isAuthenticatedUser, getAllSubjects);

module.exports = router;