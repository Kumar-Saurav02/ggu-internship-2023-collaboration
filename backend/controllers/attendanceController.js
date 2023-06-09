const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");

//ATTENDANCE DETAILS FILL
exports.fillAttendanceDetails = catchAsyncErrors(async (req, res, next) => {
  const { semester, department, students } = req.body;

  const details = await Attendance.findOne({
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
        attendance: students[i].attendance,
        totalAttendance: students[i].totalAttendance,
      });
      studentsDetails.push({
        name: students[i].name,
        rollNumber: students[i].rollNumber,
        enrollmentNumber: students[i].enrollmentNumber,
        currentAttendance: students[i].attendance,
        currentTotalAttendance: students[i].totalAttendance,
        subjects: subjects,
      });
    }
    await Attendance.create({
      semester,
      department,
      students: studentsDetails,
    });
  } else {
    for (let i = 0; i < details.students[0].subjects.length; i++) {
      if (
        students[0].subjectName.trim().toString() ===
        details.students[0].subjects[i].subjectName.trim().toString()
      ) {
        return next(
          new ErrorHandler(`Subjects Marks are already uploaded`, 404)
        );
      }
    }
    details.students.sort(function (a, b) {
      return a.rollNumber - b.rollNumber;
    });
    for (let i = 0; i < students.length; i++) {
      details.students[i].currentAttendance += students[i].attendance;
      details.students[i].currentTotalAttendance += students[i].totalAttendance;
      details.students[i].subjects.push({
        subjectName: students[i].subjectName,
        attendance: students[i].attendance,
        totalAttendance: students[i].totalAttendance,
      });
    }
    await Attendance.findOneAndUpdate({ semester, department }, details, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Attendance Updated Successfully",
  });
});

//ATTENDANCE DETAILS APPROVE
exports.approveAttendanceDetails = catchAsyncErrors(
  async (req, res, next) => {}
);

//STUDENTS BASED ON SEMESTER AND DEPARTMENT
exports.studentsBasedOnSemesterAndDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const { semester, department } = req.params;

    const students = await Student.find({
      currentSemester: semester,
      department,
    });

    res.status(200).json({
      success: true,
      students,
    });
  }
);
