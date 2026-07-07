const express = require("express");

const {
  trackVisit,
  getAnalytics,
  getAnalyticsVisits,
} = require("../controller/analytics.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

// public tracking من الموقع
router.post("/track", trackVisit);

// admin dashboard data
router.get("/", authenticate, getAnalytics);

// admin visits details
router.get("/visits", authenticate, getAnalyticsVisits);

module.exports = router;
