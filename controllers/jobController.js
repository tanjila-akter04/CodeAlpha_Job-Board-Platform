
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

module.exports = { createJob };
