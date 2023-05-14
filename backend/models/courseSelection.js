const mongoose = require("mongoose");

const courseSelectionSchema = new mongoose.Schema({
  semester: {
    type: String,
  },
  subjectName: {
    type: String,
  },
  subjectCode: {
    type: String,
  },
  subjectCredit: {
    type: String,
  },
  category: {
    type: String,
  },
  cycle: {
    type: String,
  },
});

module.exports = mongoose.model("CourseSelection", courseSelectionSchema);
