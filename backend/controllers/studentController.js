const Student = require("../models/studentModel");
const ApproveStudent = require("../models/approveStudentModel");
const CourseSelection = require("../models/courseSelectionModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");

//REGISTER APPROVAL STUDENT
exports.registerApprovalStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    enrollmentNo,
    rollNo,
    name,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
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
    avatarStudent,
    signatureAvatarStudent,
    password,
    confirmPassword,
  } = req.body;

  const studentExist = await Student.findOne({
    enrollmentNo: enrollmentNo,
  });
  if (studentExist) {
    return next(new ErrorHandler("Student already registered", 401));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const data = {
    enrollmentNo,
    rollNo,
    name,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
    password,
  };
  data.localAddress = {
    address: localAddress,
    state: localState,
    pinCode: localPinCode,
  };
  data.permanentAddress = {
    address: permanentAddress,
    state: permanentState,
    pinCode: permanentPinCode,
  };
  const profilePhotoUpload = await cloudinary.uploader.upload(avatarStudent, {
    folder: "Profile Photo Student",
    width: 300,
    crop: "scale",
  });
  data.photoUpload = {
    public_id: profilePhotoUpload.public_id,
    url: profilePhotoUpload.secure_url,
  };
  const signaturePhotoUpload = await cloudinary.uploader.upload(
    signatureAvatarStudent,
    {
      folder: "Signature of Student",
      width: 300,
      crop: "scale",
    }
  );
  data.signatureUpload = {
    public_id: signaturePhotoUpload.public_id,
    url: signaturePhotoUpload.secure_url,
  };
  await ApproveStudent.create(data);

  res.status(200).json({
    success: true,
    message: "Data sent for approval",
  });
});

//REGISTER STUDENT
exports.registerStudentAccept = catchAsyncErrors(async (req, res, next) => {
  let student = await ApproveStudent.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler(`Some error occurred`));
  }

  const {
    enrollmentNo,
    rollNo,
    name,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
    localAddress,
    permanentAddress,
    photoUpload,
    signatureUpload,
    password,
  } = student;

  message = `Your registration is approved at GGU portal. 
              \n User ID :- ${enrollmentNo}
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
    enrollmentNo,
    rollNo,
    name,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
    dateOfBirth,
    dateOfJoining,
    religion,
    bloodGroup,
    category,
    physicallyHandicapped,
    aadharNumber,
    hosteler,
    password,
  };
  data.localAddress = {
    address: localAddress.address,
    state: localAddress.state,
    pinCode: localAddress.pinCode,
  };
  data.permanentAddress = {
    address: permanentAddress.address,
    state: permanentAddress.state,
    pinCode: permanentAddress.pinCode,
  };
  data.photoUpload = {
    public_id: photoUpload.public_id,
    url: photoUpload.url,
  };
  data.signatureUpload = {
    public_id: signatureUpload.public_id,
    url: signatureUpload.url,
  };
  data.role = "student";

  await student.deleteOne({ enrollmentNo });
  await Student.create(data);

  res.status(200).json({
    success: true,
    message: "Student is registered",
  });
});

//REJECT APPROVAL STUDENT
exports.rejectApprovalStudent = catchAsyncErrors(async (req, res, next) => {
  let student = await ApproveStudent.findById(req.params.id);
  if (!student) {
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

  const photo = student.photoUpload.public_id;
  const signature = student.signatureUpload.public_id;

  await cloudinary.uploader.destroy(photo);
  await cloudinary.uploader.destroy(signature);

  await student.deleteOne({ enrollmentNo });

  res.status(200).json({
    success: true,
    message: "Student disapproved",
  });
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
    enrollmentNo,
    name,
    password,
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
    enrollmentNo,
    name,
    password,
    rollNo,
    fatherName,
    motherName,
    currentSemester,
    email,
    mobileNumber,
    fatherMobileNumber,
    motherMobileNumber,
    gender,
    department,
    course,
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
    if (req.user.signatureUpload.public_id !== undefined) {
      await cloudinary.uploader.destroy(req.user.signatureUpload.public_id);
    }
    const signaturePhotoUpload = await cloudinary.uploader.upload(
      signaturePhoto,
      {
        folder: "Signature of Student",
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

//GET ALL APPROVAL
exports.getAllStudentsApproval = catchAsyncErrors(async (req, res, next) => {
  const requests = await ApproveStudent.find();

  res.status(200).json({
    success: true,
    requests,
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
