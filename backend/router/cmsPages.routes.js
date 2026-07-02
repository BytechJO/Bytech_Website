const express = require("express");

const {
  getPublicCmsPage,
  getPublicNavbarCmsPages,
  getAdminCmsPages,
  getAdminCmsPage,
  createCmsPage,
  updateCmsPage,
  updateCmsPageNavbarStatus,
  updateCmsPageNavbarOrder,
  reorderCmsNavbarPages,
  deleteCmsPage,
} = require("../controller/cmsPages.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/public/navbar", getPublicNavbarCmsPages);
router.get("/public/:pageKey", getPublicCmsPage);

router.get("/admin", authenticate, getAdminCmsPages);
router.post("/admin", authenticate, createCmsPage);

router.patch("/admin/navbar/reorder", authenticate, reorderCmsNavbarPages);
router.patch(
  "/admin/:pageKey/navbar-status",
  authenticate,
  updateCmsPageNavbarStatus,
);
router.patch(
  "/admin/:pageKey/navbar-order",
  authenticate,
  updateCmsPageNavbarOrder,
);

router.get("/admin/:pageKey", authenticate, getAdminCmsPage);
router.put("/admin/:pageKey", authenticate, updateCmsPage);
router.delete("/admin/:pageKey", authenticate, deleteCmsPage);

module.exports = router;
