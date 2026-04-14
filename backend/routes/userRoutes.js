const express = require("express");
const router = express.Router();

const { getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// 👤 Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
