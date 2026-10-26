
const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            location,
            jobType,
            salary,
            requirements
        } = req.body;

        if (
            !title ||
            !company ||
            !description ||
            !location ||
            !jobType
        ) {
            return res.status(400).json({
                message: "Please provide all required job details"
            });
        }

        const job = await Job.create({
            title,
            company,
            description,
            location,
            jobType,
            salary,
            requirements,
            employer: req.user._id
        });

        return res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        console.error("Create Job Error:", error);

        return res.status(500).json({
            message: "Failed to create job"
        });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("employer", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: jobs.length,
            jobs
        });
    } catch (error) {
        console.error("Get Jobs Error:", error);

        return res.status(500).json({
            message: "Failed to fetch jobs"
        });
    }
};



module.exports = { createJob, getAllJobs };
