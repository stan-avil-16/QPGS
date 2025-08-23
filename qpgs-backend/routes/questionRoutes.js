const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Question = require("../models/Question");
const Subject = require("../models/Subject");

const router = express.Router();

// Get All Questions (With Subject Details)
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().populate("subjectId"); // ✅ Ensure subjects are populated
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch questions" });
  }
});

// Add Question to a Subject
router.post("/add", async (req, res) => {
  try {
    const { subjectId, module, type, question, co, po } = req.body;

    // Check if subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "❌ Subject not found!" });
    }

    // Create new question object
    const newQuestion = { module, type, question, co, po };

    // Add question to subject's questions array
    subject.questions.push(newQuestion);
    await subject.save();

    res.json({ message: "✅ Question added successfully!" });
  } catch (error) {
    console.error("❌ Error adding question:", error);
    res.status(500).json({ error: "❌ Server error while adding question" });
  }
});

// ✅ Edit a Question
router.put("/edit/:id", async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "✅ Question Updated" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error updating question" });
  }
});

// ✅ Delete a Question
router.delete("/delete/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Question Deleted" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error deleting question" });
  }
});

// ✅ Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Bulk Upload Questions from Excel
router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "❌ No file uploaded" });
    }

    console.log("✅ File Received:", req.file.originalname);

    // Read Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const questions = xlsx.utils.sheet_to_json(sheet);

    if (questions.length === 0) {
      return res.status(400).json({ error: "❌ Excel file is empty or incorrect format" });
    }

    // Insert questions into MongoDB
    await Question.insertMany(questions);

    res.json({ message: `✅ Bulk Upload Successful - ${questions.length} questions added.` });
  } catch (error) {
    console.error("❌ Error processing file:", error);
    res.status(500).json({ error: "❌ Server error while processing file", details: error.message });
  }
});

router.get("/generate", async (req, res) => {
  try {
    const { subject, type, count } = req.query; // Get filters from frontend

    if (!subject || !type || !count) {
      return res.status(400).json({ error: "❌ Subject, Type, and Count are required" });
    }

    const questions = await Question.aggregate([
      { $match: { subject, type } }, // Match the subject and marks type
      { $sample: { size: parseInt(count) } } // Randomly select 'count' number of questions
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ error: "❌ No questions found for this selection" });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "❌ Error generating question paper" });
  }
});



module.exports = router;
