const Teacher = require("../models/teacherModel");
const ApproveTeacher = require("../models/approveTeacherModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");

//REGISTER APPROVAL TEACHER
exports.registerApprovalTeacher = catchAsyncErrors(async (req, res, next) => {
  const {
    employeeID,
    email,
    name,
    gender,
    mobileNumber,
    department,
    designation,
    dateOfBirth,
    qualification,
    assignSubject,
    resume,
    profilePhoto,
    signature,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const teacherExistInRegister = await Teacher.findOne({
    employeeID,
  });
  const teacherExistInApproval = await ApproveTeacher.findOne({
    employeeID,
  });
  if (teacherExistInApproval) {
    return next(new ErrorHandler("Data already sent for approval", 401));
  }
  if (teacherExistInRegister) {
    return next(new ErrorHandler("Teacher already registered", 401));
  }

  const data = {
    employeeID,
    email,
    name,
    password,
    gender,
    mobileNumber,
    department,
    designation,
    dateOfBirth,
    qualification,
    password,
  };

  const assignedSubjects = [];
  for (let i = 0; i < assignSubject.length; i++) {
    if (assignSubject[i].value.trim() !== "") {
      assignedSubjects.push(assignSubject[i].value.trim());
    }
  }
  if (assignedSubjects.length === 0) {
    return next(
      new ErrorHandler("Assigned subjects are not filled properly", 401)
    );
  }
  data.assignSubject = assignedSubjects;

  const photoUpload = await cloudinary.uploader.upload(profilePhoto, {
    folder: "Profile Photo Teacher",
    width: 300,
    crop: "scale",
  });
  data.profilePhoto = {
    public_id: photoUpload.public_id,
    url: photoUpload.secure_url,
  };
  const signaturePhotoUpload = await cloudinary.uploader.upload(signature, {
    folder: "Signature of Student",
    width: 300,
    crop: "scale",
  });
  data.signature = {
    public_id: signaturePhotoUpload.public_id,
    url: signaturePhotoUpload.secure_url,
  };
  const resumeUpload = await cloudinary.uploader.upload(resume, {
    folder: "Resume teacher",
  });
  data.resume = {
    public_id: resumeUpload.public_id,
    url: resumeUpload.secure_url,
  };

  await ApproveTeacher.create(data);

  res.status(200).json({
    success: true,
    message: "Data sent for approval",
  });
});

//REGISTER TEACHER
exports.registerTeacherAccept = catchAsyncErrors(async (req, res, next) => {
  let teacher = await ApproveTeacher.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler(`Some error occurred`));
  }

  const {
    employeeID,
    email,
    name,
    gender,
    mobileNumber,
    department,
    designation,
    dateOfBirth,
    qualification,
    assignSubject,
    resume,
    profilePhoto,
    signature,
    password,
  } = teacher;
  console.log(teacher);

  message = `Your registration is approved at GGU portal. 
              \n User ID :- ${employeeID}
              \n Password :- ${password}
              \n You can login now`;
  try {
    await sendEmail({
      email: email,
      subject: `Registration Approval Request Update`,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  const data = {
    employeeID,
    email,
    name,
    gender,
    mobileNumber,
    department,
    designation,
    dateOfBirth,
    qualification,
    assignSubject,
    password,
  };

  if (designation === "HOD") {
    data.role = "hod";
  } else data.role = "teacher";

  data.profilePhoto = {
    public_id: profilePhoto.public_id,
    url: profilePhoto.url,
  };

  data.signature = {
    public_id: signature.public_id,
    url: signature.url,
  };

  data.resume = {
    public_id: resume.public_id,
    url: resume.url,
  };

  await teacher.deleteOne({ employeeID });
  await Teacher.create(data);

  res.status(200).json({
    success: true,
    message: "Teacher is registered",
  });
});

//REJECT APPROVAL TEACHER
exports.rejectApprovalTeacher = catchAsyncErrors(async (req, res, next) => {
  let teacher = await ApproveTeacher.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler(`Some error occurred`));
  }

  message = `Your registration is not approved at GGU portal`;
  try {
    await sendEmail({
      email: email,
      subject: `Registration Approval Request Update`,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  const photo = teacher.profilePhoto.public_id;
  const signature = teacher.signature.public_id;
  const resume = teacher.resume.public_id;

  await cloudinary.uploader.destroy(photo);
  await cloudinary.uploader.destroy(signature);
  await cloudinary.uploader.destroy(resume);

  await teacher.deleteOne({ employeeID });

  res.status(200).json({
    success: true,
    message: "Teacher disapproved",
  });
});

//LOGIN TEACHER
exports.loginTeacher = catchAsyncErrors(async (req, res, next) => {
  const { employeeID, password } = req.body;

  if (!employeeID || !password) {
    return next(
      new ErrorHandler("Please enter employeeID and password both", 400)
    );
  }

  const teacher = await Teacher.findOne({
    employeeID,
  }).select("+password");
  if (!teacher) {
    return next(new ErrorHandler("Invalid employeeID or password", 401));
  }

  const isPasswordMatched = await teacher.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid employeeID or password", 401));
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

//GET ALL APPROVAL
exports.getAllTeachersApproval = catchAsyncErrors(async (req, res, next) => {
  const requests = await ApproveTeacher.find();

  res.status(200).json({
    success: true,
    requests,
  });
});

//GET PARTICULAR TEACHER
exports.getParticularTeacher = catchAsyncErrors(async (req, res, next) => {
  const { employeeID } = req.body;

  const teacher = await Teacher.find({ employeeID });

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
