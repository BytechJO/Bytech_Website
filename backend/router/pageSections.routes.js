const express = require("express");

const {
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
} = require("../controller/pageSections.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/:id", authenticate, getSectionById);
router.post("/", authenticate, createSection);
router.put("/:id", authenticate, updateSection);
router.delete("/:id", authenticate, deleteSection);
router.patch("/reorder/:pageId", authenticate, reorderSections);

module.exports = router;
