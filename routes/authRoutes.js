
const express = require("express");
const router = express.Router();

// Register route
router.post("/register", (req, res) => {
    res.status(501).json({
        message: "Register API will be implemented soon"
    });
});

// Login route
router.post("/login", (req, res) => {
    res.status(501).json({
        message: "Login API will be implemented soon"
    });
});

module.exports = router;
