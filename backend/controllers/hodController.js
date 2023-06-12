const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subject = require("../models/subjectModel");
const CourseSelection = require("../models/courseSelectionModel");

exports.createSubject = catchAsyncErrors(async (req, res, next) => {
  const { subjectName, subjectCode, subjectCredit } = req.body;

  if (
    subjectName.trim() === "" ||
    subjectCode.trim() === "" ||
    subjectCredit < 0
  ) {
    return next(new ErrorHandler("Enter details properly", 401));
  }
  const subjectExist = await Subject.findOne({ subjectCode });

  if (subjectExist) {
    return next(new ErrorHandler("Subject already exists", 401));
  }

  await Subject.create({
    subjectName,
    subjectCode,
    subjectCredit,
  });

  res.status(201).json({
    success: true,
    message: "Subject Created Successfully",
  });
});

exports.getAllSubjects = catchAsyncErrors(async (req, res, next) => {
  const subjects = await Subject.find();

  res.status(200).json({
    success: true,
    subjects,
  });
});

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const { semester, department, courses } = req.body;

  const getCourse = await CourseSelection.findOne({ semester, department });
  if (getCourse) {
    return next(new ErrorHandler("Course already exists", 401));
  }

  const coursesDetails = [];
  for (let i = 0; i < courses.length; i++) {
    coursesDetails.push({
      subjectName: courses[i][0],
      subjectCode: courses[i][1],
      subjectCredit: courses[i][2],
      category: courses[i][3],
    });
  }

  await CourseSelection.create({
    semester,
    department,
    course: coursesDetails,
  });

  res.status(201).json({
    success: true,
    message: `Course Created for semester ${semester}`,
  });
});

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {});
