
const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/jobController");
const { protect } = require("../Middleware/authMiddleware");

// Create a new job (login required)
router.post("/", protect, createJob);

module.exports = router;
