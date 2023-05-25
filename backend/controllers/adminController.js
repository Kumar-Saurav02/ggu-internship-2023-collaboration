const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

//ADMIN REGISTER
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match"));
  }

  const adminExist = await Admin.findOne({
    email,
  });
  if (adminExist) {
    return next(new ErrorHandler("Admin already registered"));
  }

  const admin = await Admin.create({
    email,
    name,
    password,
    role: "admin",
  });

  sendToken(admin, 201, res);
});

//LOGIN ADMIN
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password both", 400));
  }

  const admin = await Admin.findOne({
    email,
  }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(admin, 200, res);
});