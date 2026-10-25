
const express = require("express");
const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed successfully",
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

module.exports = router;
