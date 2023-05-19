const Student = require("../models/studentModel");
const CourseSelection = require("../models/courseSelectionModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

//REGISTER STUDENT
exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  const { enrollmentNumber, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const studentExist = await Student.findOne({
    enrollmentNo: enrollmentNumber,
  });
  if (studentExist) {
    return next(new ErrorHandler("Student already registered", 401));
  }

  const student = await Student.create({
    enrollmentNo: enrollmentNumber,
    name,
    password,
    role: "student",
  });

  sendToken(student, 201, res);
});

//LOGIN STUDENT
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

//LOGOUT USER
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

//UPDATE DETAILS
exports.updateDetails = catchAsyncErrors(async (req, res, next) => {
  const {
    rollNo,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
    localAddress,
    localState,
    localPinCode,
    permanentAddress,
    permanentState,
    permanentPinCode,
    profilePhoto,
    signaturePhoto,
    feeSemester,
    feeBankName,
    feeAccountNumber,
    feeifscCode,
    feeAmount,
    feeChallanId,
    feeDateOfPayment,
    marksSemester,
    marksSGPA,
    marksCGPA,
    marksResult,
    attendance,
  } = req.body;

  const updatedData = {
    rollNo,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
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

  if (signaturePhoto !== undefined) {
    const signaturePhotoUpload = await cloudinary.uploader.upload(
      signaturePhoto,
      {
        folder: "signaturePhoto",
        width: 300,
        crop: "scale",
      }
    );
    updatedData.signatureUpload = {
      public_id: signaturePhotoUpload.public_id,
      url: signaturePhotoUpload.secure_url,
    };
  }

  updatedData.localAddress = {
    address: localAddress,
    state: localState,
    pinCode: localPinCode,
  };
  updatedData.permanentAddress = {
    address: permanentAddress,
    state: permanentState,
    pinCode: permanentPinCode,
  };

  if (feeSemester !== undefined) {
    const isDetailPresent = req.user.feeDetails.find(
      (detail) => detail.semester.toString() === feeSemester.toString()
    );
    if (isDetailPresent) {
      req.user.feeDetails.forEach((detail) => {
        if (detail.semester.toString() === feeSemester.toString()) {
          (detail.semester = feeSemester),
            (detail.bankName = feeBankName),
            (detail.accountNumber = feeAccountNumber),
            (detail.ifscCode = feeifscCode),
            (detail.amount = feeAmount),
            (detail.challanId = feeChallanId),
            (detail.dateOfPayment = feeDateOfPayment);
        }
      });
    } else {
      req.user.feeDetails.push({
        semester: feeSemester,
        bankName: feeBankName,
        accountNumber: feeAccountNumber,
        ifscCode: feeifscCode,
        amount: feeAmount,
        challanId: feeChallanId,
        dateOfPayment: feeDateOfPayment,
      });
    }
    await req.user.save({ validateBeforeSave: false });
  }

  if (marksSemester !== undefined) {
    const isDetailPresent = req.user.marksDetails.find(
      (detail) => detail.semester.toString() === marksSemester.toString()
    );

    if (isDetailPresent) {
      for (const detail of req.user.marksDetails) {
        if (detail.semester.toString() === marksSemester.toString()) {
          await cloudinary.uploader.destroy(detail.result.public_id);
          const uploadResult = await cloudinary.uploader.upload(marksResult, {
            folder: "results",
          });
          (detail.semester = marksSemester),
            (detail.bankName = marksSGPA),
            (detail.accountNumber = marksCGPA),
            (detail.result.public_id = uploadResult.public_id),
            (detail.result.url = uploadResult.secure_url);
        }
      }
    } else {
      const uploadResult = await cloudinary.uploader.upload(marksResult, {
        folder: "results",
      });

      req.user.marksDetails.push({
        semester: marksSemester,
        bankName: marksSGPA,
        accountNumber: marksCGPA,
        result: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
      });
    }

    await req.user.save({ validateBeforeSave: false });
  }

  if (attendance !== undefined) {
    var flag = true;
    for (let i = 0; i < req.user.attendanceDetails.length; i++) {
      if (
        req.user.attendanceDetails[i].semester.toString() ===
        attendance[0].toString()
      ) {
        req.user.attendanceDetails[i].attendance === attendance[1];
        flag = false;
      }
    }
    if (flag === true) {
      req.user.attendanceDetails.push({
        semester: attendance[0],
        attendance: attendance[1],
      });
    }
    await req.user.save({ validateBeforeSave: false });
  }

  await Student.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//GET ALL STUDENTS
exports.getAllStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    students,
  });
});

//GET PARTICULAR USER
exports.getParticularStudent = catchAsyncErrors(async (req, res, next) => {
  const { enrollmentNo } = req.body;

  const student = await Student.find({ enrollmentNo });

  res.status(200).json({
    success: true,
    student,
  });
});

//GET STUDENT DETAIL
exports.getStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.user.id);

  res.status(200).json({
    success: true,
    student,
  });
});

//GET COURSE OF STUDENT'S SEMESTER
exports.getCourseSelectionForSemester = catchAsyncErrors(
  async (req, res, next) => {
    const course = await CourseSelection.findOne(req.user.semester);

    res.status(200).json({
      success: true,
      course,
    });
  }
);
