const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  semester: {
    type: Number,
    require: [true, "Enter the semester."],
  },
  department: {
    type: String,
    require: [true, "Enter the department"],
  },
  students: [
    {
      name: {
        type: String,
      },
      rollNumber: {
        type: Number,
      },
      enrollmentNumber: {
        type: String,
      },
      currentAttendance: {
        type: Number,
      },
      currentTotalAttendance: {
        type: Number,
      },
      subjects: [
        {
          subjectName: {
            type: String,
          },
          attendance: {
            type: Number,
          },
          totalAttendance: {
            type: Number,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
