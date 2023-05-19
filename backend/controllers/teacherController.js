const Teacher = require("../models/teacherModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

//REGISTER TEACHER
exports.registerTeacher = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    gender,
    mobileNumber,
    profilePhoto,
  } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const teacherExist = await Teacher.findOne({
    email,
  });
  if (teacherExist) {
    return next(new ErrorHandler("Teacher already registered", 401));
  }

  const photoUpload = await cloudinary.uploader.upload(profilePhoto, {
    folder: "Profile Photo Teacher",
    width: 300,
    crop: "scale",
  });
  const teacher = await Teacher.create({
    email,
    name,
    password,
    gender,
    mobileNumber,
    profilePhoto: {
      public_id: photoUpload.public_id,
      url: photoUpload.secure_url,
    },
    role: "teacher",
  });

  sendToken(teacher, 201, res);
});

//LOGIN TEACHER
exports.loginTeacher = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password both", 400));
  }

  const teacher = await Teacher.findOne({
    email,
  }).select("+password");
  if (!teacher) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await teacher.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(teacher, 200, res);
});

//UPDATE DETAILS TEACHER
exports.updateDetailsTeacher = catchAsyncErrors(async (req, res, next) => {
  const { email, gender, mobileNumber, profilePhoto } = req.body;

  const updatedData = {
    email,
    gender,
    mobileNumber,
  };

  if (profilePhoto !== undefined) {
    if (req.user.photoUpload.public_id !== undefined) {
      await cloudinary.uploader.destroy(req.user.photoUpload.public_id);
    }
    const profilePhotoUpload = await cloudinary.uploader.upload(profilePhoto, {
      folder: "Profile Photo Student",
      width: 300,
      crop: "scale",
    });
    updatedData.photoUpload = {
      public_id: profilePhotoUpload.public_id,
      url: profilePhotoUpload.secure_url,
    };
  }

  await Teacher.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//GET ALL TEACHER
exports.getAllTeachers = catchAsyncErrors(async (req, res, next) => {
  const teachers = await Teacher.find();

  res.status(200).json({
    success: true,
    teachers,
  });
});

//GET PARTICULAR TEACHER
exports.getParticularTeacher = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const teacher = await Teacher.find({ email });

  res.status(200).json({
    success: true,
    teacher,
  });
});

//GET TEACHER DETAIL
exports.getTeacher = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.user.id);

  res.status(200).json({
    success: true,
    teacher,
  });
});
