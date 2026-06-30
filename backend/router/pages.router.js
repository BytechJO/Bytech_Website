const express = require("express");

const {
  getAdminPages,
  getAdminPageBySlug,
  getPublicPageBySlug,
} = require("../controller/pages.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/admin", authenticate, getAdminPages);
router.get("/admin/:slug", authenticate, getAdminPageBySlug);

router.get("/public/:slug", getPublicPageBySlug);

module.exports = router;
