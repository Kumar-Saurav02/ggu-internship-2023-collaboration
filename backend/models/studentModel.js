const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: [true, "Please enter enrollment number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should have more than 6 characters"],
    select: false,
  },
  rollNo: {
    type: Number,
  },
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  currentSemester: {
    type: Number,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  fatherMobileNumber: {
    type: String,
  },
  motherMobileNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  dateOfJoining: {
    type: Date,
  },
  religion: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  category: {
    type: String,
  },
  physicallyHandicapped: {
    type: String,
  },
  aadharNumber: {
    type: Number,
  },
  hosteler: {
    type: String,
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
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  signatureUpload: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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
