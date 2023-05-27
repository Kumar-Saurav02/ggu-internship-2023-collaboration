const mongoose = require("mongoose");

const approveTeacherSchema = new mongoose.Schema({
  employeeID: {
    type: String,
    require: [true, "Enter your employee ID"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have more than 8 characters"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please enter your mobile number"],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender"],
  },
  department: {
    type: String,
    required: [true, "Please enter your department"],
  },
  designation: {
    type: String,
    required: [true, "Please enter your designation"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please enter your date of Birth"],
  },
  qualification: {
    type: String,
    required: [true, "Please enter your qualification"],
  },
  assignSubject: [
    {
      type: String,
      required: [true, "Please enter your assigned subject"],
    },
  ],
  resume: {
    public_id: {
      type: String,
      required: [true, "Please upload your resume"],
    },
    url: {
      type: String,
      required: [true, "Please upload your resume"],
    },
  },
  profilePhoto: {
    public_id: {
      type: String,
      required: [true, "Please upload your photo"],
    },
    url: {
      type: String,
      required: [true, "Please upload your photo"],
    },
  },
  signature: {
    public_id: {
      type: String,
      required: [true, "Please upload your signature"],
    },
    url: {
      type: String,
      required: [true, "Please upload your signature"],
    },
  },
});

module.exports = mongoose.model("ApproveTeacher", approveTeacherSchema);
