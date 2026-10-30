
const Resume = require("../models/Resume");
const fs = require("fs");

// Upload a resume
const uploadMyResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF, DOC, or DOCX file"
            });
        }

        const resume = await Resume.create({
            candidate: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype
        });

        return res.status(201).json({
            message: "Resume uploaded successfully",
            resume
        });
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) {
                    console.error("Uploaded file cleanup failed:", unlinkError);
                }
            });
        }

        console.error("Upload Resume Error:", error);

        return res.status(500).json({
            message: "Failed to upload resume"
        });
    }
};

// Get resumes uploaded by the logged-in candidate
const getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({
            candidate: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count: resumes.length,
            resumes
        });
    } catch (error) {
        console.error("Get My Resumes Error:", error);

        return res.status(500).json({
            message: "Failed to fetch resumes"
        });
    }
};

module.exports = {
    uploadMyResume,
    getMyResumes
};
