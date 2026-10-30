
const express = require("express");
const router = express.Router();

const {
    uploadMyResume,
    getMyResumes
} = require("../controllers/resumeController");

const { protect } = require("../Middleware/authMiddleware");
const uploadResume = require("../Middleware/uploadMiddleware");

// Upload a resume
router.post(
    "/upload",
    protect,
    uploadResume.single("resume"),
    uploadMyResume
);

// Get my resumes
router.get("/my-resumes", protect, getMyResumes);

module.exports = router;
