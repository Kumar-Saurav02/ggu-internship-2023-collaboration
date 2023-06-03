const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Attendance = require("../models/attendanceModel");

//ATTENDANCE DETAILS FILL
exports.fillAttendanceDetails = catchAsyncErrors(async (req, res, next) => {
  const { semester, department, students } = req.body;
});
