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
      var months = [];
      months.push({
        monthName: students[i].monthName,
        attendance:
          students[i].attendance === null ? 0 : students[i].attendance,
        totalAttendance: students[i].totalAttendance,
      });
      subjects.push({
        subjectName: students[i].subjectName,
        months: months,
      });
      studentsDetails.push({
        name: students[i].name,
        rollNumber: students[i].rollNumber,
        enrollmentNumber: students[i].enrollmentNumber,
        subjects: subjects,
      });
    }
    await Attendance.create({
      semester,
      department,
      students: studentsDetails,
    });
  } else {
    details.students.sort(function (a, b) {
      return a.rollNumber - b.rollNumber;
    });

    var subjectFlag = false;
    for (let i = 0; i < details.students[0].subjects.length; i++) {
      if (
        students[0].subjectName.trim().toString() ===
        details.students[0].subjects[i].subjectName.trim().toString()
      ) {
        subjectFlag = true;
        break;
      }
    }
    if (subjectFlag === true) {
      var monthFlag = false;

      for (let i = 0; i < details.students[0].subjects[0].months.length; i++) {
        if (
          students[0].monthName.trim().toString() ===
          details.students[0].subjects[0].months[i].monthName.trim().toString()
        ) {
          monthFlag = true;
          break;
        }
      }

      if (monthFlag === true) {
        for (let i = 0; i < students.length; i++) {
          for (let j = 0; j < details.students[i].subjects.length; j++) {
            if (
              students[i].subjectName.trim().toString() ===
              details.students[i].subjects[j].subjectName.trim().toString()
            ) {
              details.students[i].subjects[j].subjectName =
                students[i].subjectName;
              for (
                let k = 0;
                k < details.students[i].subjects[j].months.length;
                k++
              ) {
                if (
                  details.students[i].subjects[j].months[k].monthName
                    .trim()
                    .toString() === students[i].monthName
                ) {
                  details.students[i].subjects[j].months[k].monthName =
                    students[i].monthName;
                  details.students[i].subjects[j].months[k].attendance =
                    students[i].attendance === null
                      ? 0
                      : students[i].attendance;
                  details.students[i].subjects[j].months[k].totalAttendance =
                    students[i].totalAttendance;
                }
              }
            }
          }
        }
      } else {
        for (let i = 0; i < students.length; i++) {
          for (let j = 0; j < details.students[i].subjects.length; j++) {
            if (
              students[i].subjectName.trim().toString() ===
              details.students[i].subjects[j].subjectName.trim().toString()
            ) {
              details.students[i].subjects[j].months.push({
                monthName: students[i].monthName,
                attendance:
                  students[i].attendance === null ? 0 : students[i].attendance,
                totalAttendance: students[i].totalAttendance,
              });
            }
          }
        }
      }
    } else {
      for (let i = 0; i < students.length; i++) {
        var months = [];
        months.push({
          monthName: students[i].monthName,
          attendance:
            students[i].attendance === null ? 0 : students[i].attendance,
          totalAttendance: students[i].totalAttendance,
        });
        details.students[i].subjects.push({
          subjectName: students[i].subjectName,
          months: months,
        });
      }
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

//GET ATTENDANCE DETAILS
exports.getAttendanceDetailsOfParticularSubject = catchAsyncErrors(
  async (req, res, next) => {
    const { semester, department, subject } = req.params;

    const attendanceDetails = await Attendance.findOne({
      semester,
      department,
    });

    var flag = false;

    if (attendanceDetails) {
      for (let i = 0; i < attendanceDetails.students[0].subjects.length; i++) {
        if (
          attendanceDetails.students[0].subjects[i].subjectName
            .trim()
            .toString() === subject.trim().toString()
        ) {
          flag = true;
        }
      }
    }

    res.status(200).json({
      success: true,
      attendanceDetails,
    });
  }
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
