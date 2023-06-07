const mongoose = require("mongoose");

const approveCourseSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: [true, "Enter semester"],
  },
  name: {
    type: String,
    required: [true, "Enter Your Name"],
  },
  enrollmentNumber: {
    type: String,
    required: [true, "Enter Your Enrollment Number"],
  },
  department: {
    type: String,
    required: [true, "Enter your Department"],
  },
  subjects: [
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
      term: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ApproveCourse", approveCourseSchema);
