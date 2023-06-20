const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Marks = require("../models/marksModel");
const Student = require("../models/studentModel");

//MARKS DETAILS FILL
exports.fillMarksDetails = catchAsyncErrors(async (req, res, next) => {
  const { semester, department, students } = req.body;

  const details = await Marks.findOne({
    semester: semester,
    department: department,
  });

  students.sort(function (a, b) {
    return a.rollNumber - b.rollNumber;
  });

  if (!details) {
    var studentsDetails = [];
    for (let i = 0; i < students.length; i++) {
      var subjects = [];
      subjects.push({
        subjectName: students[i].subjectName,
        classTest1:
          students[i].classTest1 === null ? 0 : students[i].classTest1,
        classTest2:
          students[i].classTest2 === null ? 0 : students[i].classTest2,
        endSemester:
          students[i].endSemester === null ? 0 : students[i].endSemester,
      });
      studentsDetails.push({
        name: students[i].name,
        rollNumber: students[i].rollNumber,
        enrollmentNumber: students[i].enrollmentNumber,
        subjects: subjects,
      });
    }

    await Marks.create({
      semester,
      department,
      students: studentsDetails,
    });
  } else {
    details.students.sort(function (a, b) {
      return a.rollNumber - b.rollNumber;
    });

    var flag = false;
    for (let i = 0; i < details.students[0].subjects.length; i++) {
      if (
        students[0].subjectName.trim().toString() ===
        details.students[0].subjects[i].subjectName.trim().toString()
      ) {
        flag = true;
      }
    }

    if (flag === true) {
      for (let i = 0; i < students.length; i++) {
        for (let j = 0; j < details.students[i].subjects.length; j++) {
          if (
            students[i].subjectName.trim().toString() ===
            details.students[i].subjects[j].subjectName.trim().toString()
          ) {
            details.students[i].subjects[j].classTest1 =
              students[i].classTest1 === null ? 0 : students[i].classTest1;
            details.students[i].subjects[j].classTest2 =
              students[i].classTest2 === null ? 0 : students[i].classTest2;
            details.students[i].subjects[j].endSemester =
              students[i].endSemester === null ? 0 : students[i].endSemester;
          }
        }
      }
    } else {
      for (let i = 0; i < students.length; i++) {
        details.students[i].subjects.push({
          subjectName: students[i].subjectName,
          classTest1:
            students[i].classTest1 === null ? 0 : students[i].classTest1,
          classTest2:
            students[i].classTest2 === null ? 0 : students[i].classTest2,
          endSemester:
            students[i].endSemester === null ? 0 : students[i].endSemester,
        });
      }
    }

    await Marks.findOneAndUpdate({ semester, department }, details, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Marks Updated Successfully",
  });
});

//GET MARKS DETAILS
exports.getMarksDetailsOfParticularSubject = catchAsyncErrors(
  async (req, res, next) => {
    const { semester, department, subject } = req.params;

    const marksDetails = await Marks.findOne({
      semester,
      department,
    });

    var flag = false;

    if (marksDetails) {
      for (let i = 0; i < marksDetails.students[0].subjects.length; i++) {
        if (
          marksDetails.students[0].subjects[i].subjectName.trim().toString() ===
          subject.trim().toString()
        ) {
          flag = true;
        }
      }
    }

    if (flag === false) {
      return next(new ErrorHandler("No Previous Data", 401));
    }

    res.status(200).json({
      success: true,
      marksDetails,
    });
  }
);
