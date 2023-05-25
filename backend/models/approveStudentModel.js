const mongoose = require("mongoose");

const approveStudentSchema = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: [true, "Please enter enrollment number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have more than 6 characters"],
  },
  rollNo: {
    type: Number,
    required: [true, "Please fill your roll number"],
  },
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  fatherName: {
    type: String,
    required: [true, "Please fill your father's name"],
  },
  motherName: {
    type: String,
    required: [true, "Please fill your mother's name"],
  },
  currentSemester: {
    type: Number,
    required: [true, "Please fill your semester"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please fill your mobile number"],
  },
  fatherMobileNumber: {
    type: String,
    required: [true, "Please fill your father's mobile number"],
  },
  motherMobileNumber: {
    type: String,
    required: [true, "Please fill your mother's mobile number"],
  },
  gender: {
    type: String,
    required: [true, "Please fill your gender"],
  },
  department: {
    type: String,
    required: [true, "Please fill your department"],
  },
  course: {
    type: String,
    required: [true, "Please fill your course"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please fill your date of birth"],
  },
  dateOfJoining: {
    type: String,
    required: [true, "Please fill your date of joining"],
  },
  religion: {
    type: String,
    required: [true, "Please fill your religion"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please fill your blood group"],
  },
  category: {
    type: String,
    required: [true, "Please fill your category"],
  },
  physicallyHandicapped: {
    type: String,
    required: [true, "Please fill required box"],
  },
  aadharNumber: {
    type: Number,
    required: [true, "Please fill your aadhar number"],
  },
  hosteler: {
    type: String,
    required: [true, "Please fill required box"],
  },
  localAddress: {
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  permanentAddress: {
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  photoUpload: {
    public_id: {
      type: String,
      required: [true, "Please upload the photo"],
    },
    url: {
      type: String,
      required: [true, "Please upload the photo"],
    },
  },
  signatureUpload: {
    public_id: {
      type: String,
      required: [true, "Please upload the signature"],
    },
    url: {
      type: String,
      required: [true, "Please upload the signature"],
    },
  },
});

module.exports = mongoose.model("ApproveStudent", approveStudentSchema);