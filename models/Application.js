
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        coverLetter: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "pending",
                "reviewed",
                "shortlisted",
                "rejected",
                "accepted"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

// Prevent the same candidate from applying
// to the same job more than once.
applicationSchema.index(
    { job: 1, candidate: 1 },
    { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);
