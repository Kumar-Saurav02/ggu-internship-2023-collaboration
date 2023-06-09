const mongoose = require("mongoose");

const courseSelectionSchema = new mongoose.Schema({
  semester: {
    type: Number,
  },
  department: {
    type: String,
  },
  course: [
    {
      subjectName: {
        type: String,
      },
      subjectCode: {
        type: String,
      },
      subjectCredit: {
        type: Number,
      },
      category: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("CourseSelection", courseSelectionSchema);
