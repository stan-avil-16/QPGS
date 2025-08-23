const express = require("express");
const Subject = require("../models/Subject");

const router = express.Router();

// Add Subject Route
router.post("/add", async (req, res) => {
  try {
    const { subjectName, subjectCode, credits, totalHours } = req.body;

    const newSubject = new Subject({
      subjectName,
      subjectCode,
      credits,
      totalHours,
      questions: [] // ✅ Ensure questions array is initialized
    });

    await newSubject.save();
    res.json({ message: "✅ Subject Added Successfully!" });
  } catch (error) {
    console.error("❌ Error adding subject:", error);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});


// Get All Subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch subjects" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Error updating subject" });
  }
});

module.exports = router;
