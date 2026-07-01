const express = require("express");

const {
  getAdminPages,
  getAdminPageBySlug,
  getPublicPageBySlug,
  createPage,
  updatePage,
  deletePage,
  updatePageNavbarStatus,
  getNavbarPages,
  reorderNavbarPages,
} = require("../controller/pages.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/navbar", getNavbarPages);
router.get("/public/:slug", getPublicPageBySlug);

router.get("/admin", authenticate, getAdminPages);
router.post("/admin", authenticate, createPage);

router.patch("/admin/navbar/reorder", authenticate, reorderNavbarPages);
router.patch("/admin/:id/navbar", authenticate, updatePageNavbarStatus);

router.put("/admin/:id", authenticate, updatePage);
router.delete("/admin/:id", authenticate, deletePage);

router.get("/admin/:slug", authenticate, getAdminPageBySlug);

module.exports = router;
