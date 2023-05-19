const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
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
    minLength: [6, "Password should have more than 6 characters"],
    select: false,
  },
  mobileNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  qualification: {
    type: String,
  },
  assignSubject: [
    {
      type: String,
    },
  ],
  resume: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  profilePhoto: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  signature: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
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
