const express = require("express");
const {
  getSectionsByPage,
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/sections.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/page/:pageId", authenticate, getSectionsByPage);
router.post("/", authenticate, createSection);
router.put("/:id", authenticate, updateSection);
router.delete("/:id", authenticate, deleteSection);

module.exports = router;
