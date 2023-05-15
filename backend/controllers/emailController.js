const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorhandler");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");

exports.sendOtp = catchAsyncErrors(async (req, res, next) => {
  let message = "";
  let otp = Math.floor(100000 + Math.random() * 900000);

  const { email, purpose } = req.body;

  const student = await Student.findOne({ email });
  const teacher = await Teacher.findOne({ email });
  const admin = await Admin.findOne({ email });

  if (purpose === "register") {
    //     if (student || teacher || admin) {
    //       return next(
    //         new ErrorHandler("User already registered, try logging in", 401)
    //       );
    //     }
    //MESSAGE TO BE SENT ON EMAIL
    message = `Your OTP for registration is :- ${otp}
               \n If you have not requested this email, please ignore it`;
  }

  try {
    await sendEmail({
      email: req.body.email,
      subject: `OTP for verification`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent successfully`,
      otp,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
