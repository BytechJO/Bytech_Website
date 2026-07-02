const pool = require("../database/db");

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    null
  );
}

exports.createContactMessage = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      fullName,
      full_name,
      name,
      company,
      email,
      phone,
      service,
      brief,
      message,
    } = req.body || {};

    const finalName = fullName || full_name || name;
    const finalMessage = brief || message;

    if (!finalName || !email || !finalMessage) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and message are required.",
      });
    }

    await client.query("BEGIN");

    const contactResult = await client.query(
      `
      INSERT INTO contact_messages (
        full_name,
        company,
        email,
        phone,
        service,
        message,
        payload
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        finalName,
        company || null,
        email,
        phone || null,
        service || null,
        finalMessage,
        {
          ...req.body,
          ip: getClientIp(req),
          userAgent: req.headers["user-agent"] || null,
        },
      ],
    );

    const contactMessage = contactResult.rows[0];

    const notificationResult = await client.query(
      `
      INSERT INTO notifications (
        type,
        title,
        message,
        entity_type,
        entity_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        "contact_message",
        "New contact message",
        `${finalName} sent a new message about ${service || "General inquiry"}.`,
        "contact_message",
        contactMessage.id,
      ],
    );

    const notification = notificationResult.rows[0];

    await client.query("COMMIT");

    const io = req.app.get("io");

    if (io) {
      io.to("admin").emit("notification:new", notification);
      io.to("admin").emit("contact:new", contactMessage);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contactMessage,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  } finally {
    client.release();
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const { status, read } = req.query;

    const conditions = [];
    const values = [];

    if (status && status !== "all") {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (read === "true" || read === "false") {
      values.push(read === "true");
      conditions.push(`is_read = $${values.length}`);
    }

    const whereSql = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const result = await pool.query(
      `
      SELECT *
      FROM contact_messages
      ${whereSql}
      ORDER BY created_at DESC
      `,
      values,
    );

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load contact messages.",
    });
  }
};

exports.getContactMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM contact_messages
      WHERE id = $1
      `,
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    await pool.query(
      `
      UPDATE contact_messages
      SET is_read = true,
          updated_at = NOW()
      WHERE id = $1
      `,
      [id],
    );

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load contact message.",
    });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, is_read } = req.body;

    const allowedStatuses = ["new", "in_progress", "done", "archived"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const result = await pool.query(
      `
      UPDATE contact_messages
      SET status = COALESCE($1, status),
          is_read = COALESCE($2, is_read),
          updated_at = NOW()
      WHERE id = $3
      RETURNING *
      `,
      [
        status || null,
        typeof is_read === "boolean" ? is_read : null,
        id,
      ],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.json({
      success: true,
      message: "Contact message updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update contact status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact message.",
    });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM contact_messages
      WHERE id = $1
      RETURNING id
      `,
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message.",
    });
  }
};