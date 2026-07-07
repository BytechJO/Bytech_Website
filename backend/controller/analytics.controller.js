const pool = require("../database/db");

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket.remoteAddress || req.ip || "unknown";
}

const trackVisit = async (req, res) => {
  const client = await pool.connect();

  try {
    const { visitorId, path } = req.body;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "visitorId is required",
      });
    }

    if (path && path.startsWith("/admin")) {
      return res.status(200).json({
        success: true,
        tracked: false,
        message: "Admin path ignored",
      });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown";

    await client.query("BEGIN");

    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
      visitorId,
    ]);

    const existingVisit = await client.query(
      `
      SELECT id
      FROM visits
      WHERE visitor_id = $1
        AND created_at >= NOW() - INTERVAL '5 minutes'
      LIMIT 1
      `,
      [visitorId],
    );

    if (existingVisit.rows.length > 0) {
      await client.query("COMMIT");

      return res.status(200).json({
        success: true,
        tracked: false,
        message: "Already tracked within 10 minutes",
      });
    }

    await client.query(
      `
      INSERT INTO visits (visitor_id, ip, user_agent, path)
      VALUES ($1, $2, $3, $4)
      `,
      [visitorId, ip, userAgent, path || "/"],
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      tracked: true,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Track visit error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to track visit",
    });
  } finally {
    client.release();
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalResult = await pool.query(`
      SELECT COUNT(*)::int AS total_visits
      FROM visits
    `);

    const todayResult = await pool.query(`
      SELECT COUNT(*)::int AS today_visits
      FROM visits
      WHERE created_at::date = CURRENT_DATE
    `);

    return res.status(200).json({
      success: true,
      data: {
        totalVisits: totalResult.rows[0].total_visits,
        todayVisits: todayResult.rows[0].today_visits,
      },
    });
  } catch (error) {
    console.error("Get analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get analytics",
    });
  }
};

module.exports = {
  trackVisit,
  getAnalytics,
};
