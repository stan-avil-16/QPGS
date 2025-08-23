const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  module: { type: Number, required: true },
  type: { type: String, required: true },
  question: { type: String, required: true },
  co: { type: String, required: true },
  po: { type: String, required: true }
});

module.exports = mongoose.model("Question", QuestionSchema);
