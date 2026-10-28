
const Application = require("../models/Application");
const Job = require("../models/Job");
const Resume = require("../models/Resume");

// Apply for a job
const applyForJob = async (req, res) => {
    try {
        const { jobId, resumeId, coverLetter } = req.body;

        if (!jobId || !resumeId) {
            return res.status(400).json({
                message: "Job ID and Resume ID are required"
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.status !== "open") {
            return res.status(400).json({
                message: "This job is no longer accepting applications"
            });
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const application = await Application.create({
            job: jobId,
            candidate: req.user._id,
            resume: resumeId,
            coverLetter: coverLetter || ""
        });

        return res.status(201).json({
            message: "Job application submitted successfully",
            application
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "You have already applied for this job"
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid job ID or resume ID"
            });
        }

        console.error("Apply for Job Error:", error);

        return res.status(500).json({
            message: "Failed to submit job application"
        });
    }
};

// Get applications submitted by the logged-in candidate
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            candidate: req.user._id
        })
            .populate("job")
            .populate("resume")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: applications.length,
            applications
        });
    } catch (error) {
        console.error("Get My Applications Error:", error);

        return res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
};

module.exports = {
    applyForJob,
    getMyApplications
};

