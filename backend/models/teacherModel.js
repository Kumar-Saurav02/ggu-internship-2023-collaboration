const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
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
    select: false,
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
  role: {
    type: String,
  },
  subRole: {
    type: String,
  },
});

//PASSWORD HASHING
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
teacherSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//COMPARE PASSWORD
teacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Teacher", teacherSchema);
