const Student = require("../models/studentModel");
const ApproveStudent = require("../models/approveStudentModel");
const ApproveCourse = require("../models/approveCourseModel");
const ApproveScholarship = require("../models/approveScholarshipModel");
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

  const studentExistEnrollmentNumber = await Student.findOne({
    enrollmentNo: enrollmentNo,
  });
  const studentExistRollNumber = await Student.findOne({
    rollNo: rollNo,
  });

  const studentExistInApprovalEnrollmentNumber = await ApproveStudent.findOne({
    enrollmentNo: enrollmentNo,
  });
  const studentExistInApprovalRollNumber = await ApproveStudent.findOne({
    rollNo: rollNo,
  });
  if (studentExistEnrollmentNumber || studentExistRollNumber) {
    return next(new ErrorHandler("Student already registered", 401));
  }
  if (
    studentExistInApprovalEnrollmentNumber ||
    studentExistInApprovalRollNumber
  ) {
    return next(new ErrorHandler("Data already sent for approval", 401));
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
    message: "Student is Registered",
  });
});

//REJECT APPROVAL STUDENT
exports.rejectApprovalStudent = catchAsyncErrors(async (req, res, next) => {
  let student = await ApproveStudent.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler(`Some error occurred`));
  }

  const { enrollmentNo, email } = student;

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
    message: "Student Disapproved",
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
    profilePhoto,
    signaturePhoto,
    feeSemester,
    feeBankName,
    feeAccountNumber,
    feeifscCode,
    feeAmount,
    feeChallanId,
    feeDateOfPayment,
    feeDocument,
    marksSemester,
    marksSGPA,
    marksCGPA,
    marksResult,
    attendance,
    courseSubmission,
    scholarshipSession,
    scholarshipState,
    scholarshipName,
    scholarshipDocument,
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
      for (const detail of req.user.feeDetails) {
        if (detail.semester.toString() === feeSemester.toString()) {
          await cloudinary.uploader.destroy(detail.fees.public_id);
          const uploadFees = await cloudinary.uploader.upload(feeDocument, {
            folder: "fees",
          });
          await Student.updateOne(
            { _id: req.user._id, "feeDetails.semester": detail.semester },
            {
              $set: {
                "feeDetails.$.semester": feeSemester,
                "feeDetails.$.bankName": feeBankName,
                "feeDetails.$.accountNumber": feeAccountNumber,
                "feeDetails.$.ifscCode": feeifscCode,
                "feeDetails.$.amount": feeAmount,
                "feeDetails.$.challanId": feeChallanId,
                "feeDetails.$.dateOfPayment": feeDateOfPayment,
                "feeDetails.$.fees.public_id": uploadFees.public_id,
                "feeDetails.$.fees.url": uploadFees.secure_url,
              },
            }
          );
        }
      }
    } else {
      const uploadFees = await cloudinary.uploader.upload(feeDocument, {
        folder: "fees",
      });
      req.user.feeDetails.push({
        semester: feeSemester,
        bankName: feeBankName,
        accountNumber: feeAccountNumber,
        ifscCode: feeifscCode,
        amount: feeAmount,
        challanId: feeChallanId,
        dateOfPayment: feeDateOfPayment,
        fees: {
          public_id: uploadFees.public_id,
          url: uploadFees.secure_url,
        },
      });
      await req.user.save({ validateBeforeSave: false });
    }
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
          await Student.updateOne(
            { _id: req.user._id, "marksDetails.semester": detail.semester },
            {
              $set: {
                "marksDetails.$.semester": marksSemester,
                "marksDetails.$.cgpa": marksCGPA,
                "marksDetails.$.sgpa": marksSGPA,
                "marksDetails.$.result.public_id": uploadResult.public_id,
                "marksDetails.$.result.url": uploadResult.secure_url,
              },
            }
          );
        }
      }
    } else {
      const uploadResult = await cloudinary.uploader.upload(marksResult, {
        folder: "results",
      });

      req.user.marksDetails.push({
        semester: marksSemester,
        cgpa: marksSGPA,
        sgpa: marksCGPA,
        result: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
      });
      await req.user.save({ validateBeforeSave: false });
    }
  }
  if (attendance !== undefined) {
    var flag = true;
    for (let i = 0; i < req.user.attendanceDetails.length; i++) {
      if (
        req.user.attendanceDetails[i].semester.toString() ===
        attendance[0].toString()
      ) {
        await Student.updateOne(
          { _id: req.user._id, "attendanceDetails.semester": attendance[0] },
          {
            $set: {
              "attendanceDetails.$.attendance": attendance[1],
            },
          }
        );
        flag = false;
      }
    }
    if (flag === true) {
      req.user.attendanceDetails.push({
        semester: attendance[0],
        attendance: attendance[1],
      });
      await req.user.save({ validateBeforeSave: false });
    }
  }

  if (courseSubmission !== undefined) {
    var subjects = [];
    for (let i = 0; i < courseSubmission.course.length; i++) {
      subjects.push({
        subjectName: courseSubmission.course[i].subjectName,
        subjectCode: courseSubmission.course[i].subjectCode,
        subjectCredit: courseSubmission.course[i].subjectCredit,
        category: courseSubmission.course[i].category,
        term: req.user.currentSemester + " " + "Semester",
      });
    }
    await ApproveCourse.create({
      name: req.user.name,
      enrollmentNumber: req.user.enrollmentNo,
      department: req.user.department,
      semester: courseSubmission.semester,
      subjects: subjects,
    });
    res.status(200).json({
      success: true,
      message: "Course Selection sent for approval",
    });
  }

  if (scholarshipSession !== undefined) {
    if (scholarshipDocument !== "") {
      const uploadScholarship = await cloudinary.uploader.upload(
        scholarshipDocument,
        {
          folder: "Scholarship",
        }
      );
      const docs = {
        public_id: uploadScholarship.public_id,
        url: uploadScholarship.secure_url,
      };
      await ApproveScholarship.create({
        name: req.user.name,
        enrollmentNumber: req.user.enrollmentNo,
        department: req.user.department,
        semester: req.user.currentSemester,
        session: scholarshipSession,
        state: scholarshipState,
        scholarship: scholarshipName,
        scholarshipDocument: docs,
      });
    } else {
      await ApproveScholarship.create({
        name: req.user.name,
        enrollmentNumber: req.user.enrollmentNo,
        department: req.user.department,
        semester: req.user.currentSemester,
        session: scholarshipSession,
        state: scholarshipState,
        scholarship: scholarshipName,
      });
    }
    res.status(200).json({
      success: true,
      message: "Scholarship details sent for approval",
    });
  }

  await Student.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Details Updated Successfully",
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
    const sem = req.user.semester;
    const depart = req.user.department;

    const course = await CourseSelection.findOne({
      semester: sem,
      department: depart,
    });

    res.status(200).json({
      success: true,
      course,
    });
  }
);

exports.getCourseSubjectList = catchAsyncErrors(async (req, res, next) => {
  const sem = req.params.semester;
  const depart = req.params.department;

  const course = await CourseSelection.findOne({
    semester: sem,
    department: depart,
  });

  if (!course) {
    return next(
      new ErrorHandler(
        "No Subjects Updated For Selected Semester And Department",
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    subjects: course.course,
  });
});
