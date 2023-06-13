const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: [true, "Enter the semester."],
  },
  department: {
    type: String,
    required: [true, "Enter the department"],
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
      subjects: [
        {
          subjectName: {
            type: String,
          },
          classTest1: {
            type: Number,
          },
          classTest2: {
            type: Number,
          },
          endSemester: {
            type: Number,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Mark", marksSchema);
