const express = require("express");
const {
  getBlocksBySection,
  createBlock,
  updateBlock,
  deleteBlock,
} = require("../controller/blocks.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/section/:sectionId", authenticate, getBlocksBySection);
router.post("/", authenticate, createBlock);
router.put("/:id", authenticate, updateBlock);
router.delete("/:id", authenticate, deleteBlock);

module.exports = router;
