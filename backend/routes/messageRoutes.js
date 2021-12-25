const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
