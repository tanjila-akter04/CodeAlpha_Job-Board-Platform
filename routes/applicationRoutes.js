
const express = require("express");
const router = express.Router();

const {
    applyForJob,
    getMyApplications
} = require("../controllers/applicationController");

const { protect } = require("../Middleware/authMiddleware");

// Submit a job application
router.post("/", protect, applyForJob);

// Get applications submitted by the logged-in candidate
router.get("/my-applications", protect, getMyApplications);

module.exports = router;
