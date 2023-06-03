const express = require("express");
const {
  createSubject,
  createCourse,
  updateCourse,
  getAllSubjects,
} = require("../controllers/hodController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createSubject").post(createSubject);
router.route("/createCourse").post(createCourse);
router.route("/updateCourse").put(updateCourse);
router.route("/getAllSubjects").get(getAllSubjects);

module.exports = router;
