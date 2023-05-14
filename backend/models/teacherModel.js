const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should have more than 6 characters"],
    select: false,
  },
  mobileNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
