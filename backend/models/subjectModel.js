const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
  },
  subjectCode: {
    type: String,
  },
  semester: {
    type: String,
  },
  subjectCredit: {
    type: String,
  },
});

module.exports = mongoose.model("Student", subjectSchema);
