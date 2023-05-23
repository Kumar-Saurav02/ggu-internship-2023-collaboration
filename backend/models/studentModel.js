const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: [true, "Please enter enrollment number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have more than 6 characters"],
    select: false,
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
  feeDetails: [
    {
      semester: {
        type: Number,
      },
      bankName: {
        type: String,
      },
      accountNumber: {
        type: Number,
      },
      ifscCode: {
        type: String,
      },
      amount: {
        type: Number,
      },
      challanId: {
        type: String,
      },
      dateOfPayment: {
        type: Date,
      },
    },
  ],
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
  marksDetails: [
    {
      semester: {
        type: Number,
      },
      cgpa: {
        type: Number,
      },
      sgpa: {
        type: Number,
      },
      result: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
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
  attendanceDetails: [
    {
      semester: {
        type: Number,
      },
      attendance: {
        type: Number,
      },
    },
  ],
  backSubject: [
    {
      subjectName: {
        type: String,
      },
      subjectCode: {
        type: String,
      },
      semester: {
        type: Number,
      },
      subjectCredit: {
        type: String,
      },
    },
  ],
  courseSelected: [
    {
      semester: {
        type: Number,
      },
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
      cycle: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
  },
});

//PASSWORD HASHING
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
studentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//COMPARE PASSWORD
studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
