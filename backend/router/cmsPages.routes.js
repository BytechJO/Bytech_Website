const express = require("express");

const {
  getPublicCmsPage,
  getAdminCmsPages,
  getAdminCmsPage,
  createCmsPage,
  updateCmsPage,
  deleteCmsPage,
} = require("../controller/cmsPages.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Public
router.get("/public/:pageKey", getPublicCmsPage);

// Admin
router.get("/admin", authenticate, getAdminCmsPages);
router.get("/admin/:pageKey", authenticate, getAdminCmsPage);
router.post("/admin", authenticate, createCmsPage);
router.put("/admin/:pageKey", authenticate, updateCmsPage);
router.delete("/admin/:pageKey", authenticate, deleteCmsPage);

module.exports = router;
