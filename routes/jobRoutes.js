
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
const { authorizeRoles } = require("../Middleware/roleMiddleware");

// Get all jobs
router.get("/", getAllJobs);

// Get one job by ID
router.get("/:id", getJobById);

// Employer only: Create a job
router.post("/", protect, authorizeRoles("employer"), createJob);

// Employer only: Update a job
router.put("/:id", protect, authorizeRoles("employer"), updateJob);

// Employer only: Delete a job
router.delete("/:id", protect, authorizeRoles("employer"), deleteJob);

module.exports = router;
