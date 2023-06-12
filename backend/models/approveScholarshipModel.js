const mongoose = require("mongoose");

const approveScholarshipSchema = new mongoose.Schema({
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
  semester: {
    type: Number,
    required: [true, "Enter Your Semester"],
  },
  session: {
    type: String,
    required: [true, "Enter session"],
  },
  state: {
    type: String,
    required: [true, "Enter state"],
  },
  scholarship: {
    type: String,
    required: [true, "Enter name of scholarship"],
  },
  scholarshipDocument: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("ApproveScholarship", approveScholarshipSchema);
