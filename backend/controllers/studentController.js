const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//REGISTER USER
exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  const { enrollmentNumber, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match"));
  }

  const studentExist = Student.findOne({ enrollmentNo: enrollmentNumber });
  if (studentExist) {
    return next(new ErrorHandler("Student already registered"));
  }

  const student = await Student.create({
    enrollmentNo: enrollmentNumber,
    password,
  });

  sendToken(student, 201, res);
});

//LOGIN USER
exports.loginStudent = catchAsyncErrors(async (req, res, next) => {
  const { enrollmentNumber, password } = req.body;

  if (!enrollmentNumber || !password) {
    return next(
      new ErrorHandler("Please enter enrollment number and password both", 400)
    );
  }

  const student = await Student.findOne({
    enrollmentNo: enrollmentNumber,
  }).select("+password");
  if (!student) {
    return next(new ErrorHandler("Invalid enrollment number or password", 401));
  }

  const isPasswordMatched = await student.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(student, 200, res);
});

//LOGOUT STUDENT
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
