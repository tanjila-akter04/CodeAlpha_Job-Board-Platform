
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        role: {
            type: String,
            enum: ["candidate", "employer"],
            default: "candidate"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
