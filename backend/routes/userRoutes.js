const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(protect, allUsers);

module.exports = router;
