const express = require("express");

const {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactStatus,
  deleteContactMessage,
} = require("../controller/contact.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/", createContactMessage);

router.get("/admin", authenticate, getContactMessages);
router.get("/admin/:id", authenticate, getContactMessageById);
router.patch("/admin/:id", authenticate, updateContactStatus);
router.delete("/admin/:id", authenticate, deleteContactMessage);

module.exports = router;
