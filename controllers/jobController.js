
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
        const { keyword, location, jobType } = req.query;

        const filter = {};

        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { company: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (jobType) {
            filter.jobType = jobType.toLowerCase();
        }

        const jobs = await Job.find(filter)
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


const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("employer", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({ job });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        console.error("Get Job Error:", error);

        return res.status(500).json({
            message: "Failed to fetch job"
        });
    }
};


const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to update this job"
            });
        }

        const allowedFields = [
            "title",
            "company",
            "description",
            "location",
            "jobType",
            "salary",
            "requirements",
            "status"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                job[field] = req.body[field];
            }
        });

        const updatedJob = await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        console.error("Update Job Error:", error);

        return res.status(500).json({
            message: "Failed to update job"
        });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to delete this job"
            });
        }

        await job.deleteOne();

        return res.status(200).json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        console.error("Delete Job Error:", error);

        return res.status(500).json({
            message: "Failed to delete job"
        });
    }
};


module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
