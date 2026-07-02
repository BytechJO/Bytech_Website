const express = require("express");

const {
  getNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} = require("../controller/notifications.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, getNotifications);
router.get("/unread-count", authenticate, getUnreadNotificationsCount);

router.patch("/read-all", authenticate, markAllNotificationsAsRead);
router.patch("/:id/read", authenticate, markNotificationAsRead);

router.delete("/:id", authenticate, deleteNotification);

module.exports = router;
