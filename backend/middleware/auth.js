const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

//AUTHENTICATING
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  const student = await Student.findById(decodeData.id);
  const teacher = await Teacher.findById(decodeData.id);
  if (student === null) req.user = teacher;
  else if (teacher === null) req.user = student;

  next();
});

//AUTHORIZING STUDENTS
exports.authorizeRolesStudent = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

//AUTHORIZING TEACHERS
exports.authorizeRolesTeacher = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

exports.authorizeSubRolesTeacher = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.subRole)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
