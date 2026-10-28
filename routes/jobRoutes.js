
const express = require("express");
const router = express.Router();



const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");



const { protect } = require("../Middleware/authMiddleware");

// Get all jobs
router.get("/", getAllJobs);

// Get one job by ID
router.get("/:id", getJobById);

// Create a new job
router.post("/", protect, createJob);

router.put("/:id", protect, updateJob);

// Delete a job
router.delete("/:id", protect, deleteJob);

module.exports = router;

