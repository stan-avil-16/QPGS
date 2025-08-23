const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  credits: { type: Number, required: true },
  totalHours: { type: Number, required: true },
  questions: { type: Array, default: [] } // ✅ Ensure questions field exists by default
});

module.exports = mongoose.model("Subject", subjectSchema);
