const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
  subject: String,
  pattern: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  generatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Paper", PaperSchema);
