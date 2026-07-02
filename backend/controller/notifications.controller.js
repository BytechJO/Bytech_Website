const pool = require("../database/db");

exports.getNotifications = async (req, res) => {
  try {
    const { read } = req.query;

    const values = [];
    let whereSql = "";

    if (read === "true" || read === "false") {
      values.push(read === "true");
      whereSql = `WHERE is_read = $1`;
    }

    const result = await pool.query(
      `
      SELECT *
      FROM notifications
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT 100
      `,
      values,
    );

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load notifications.",
    });
  }
};

exports.getUnreadNotificationsCount = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT COUNT(*)::int AS count
      FROM notifications
      WHERE is_read = false
      `,
    );

    return res.json({
      success: true,
      count: result.rows[0].count,
    });
  } catch (error) {
    console.error("Get unread notifications count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load notifications count.",
    });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE notifications
      SET is_read = true,
          read_at = NOW()
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notification.",
    });
  }
};

exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    await pool.query(
      `
      UPDATE notifications
      SET is_read = true,
          read_at = COALESCE(read_at, NOW())
      WHERE is_read = false
      `,
    );

    return res.json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notifications.",
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM notifications
      WHERE id = $1
      RETURNING id
      `,
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification.",
    });
  }
};
