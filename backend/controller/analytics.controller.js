const pool = require("../database/db");
const UAParser = require("ua-parser-js");
const geoip = require("geoip-lite");

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket.remoteAddress || req.ip || "unknown";
}

function cleanIp(ip = "") {
  return String(ip).replace("::ffff:", "").trim();
}

function isPrivateIp(ip = "") {
  const cleanedIp = cleanIp(ip);

  if (
    cleanedIp === "127.0.0.1" ||
    cleanedIp === "::1" ||
    cleanedIp === "localhost" ||
    cleanedIp === "0.0.0.0"
  ) {
    return true;
  }

  if (cleanedIp.startsWith("10.")) return true;
  if (cleanedIp.startsWith("192.168.")) return true;

  const parts = cleanedIp.split(".").map(Number);

  if (parts.length === 4) {
    const first = parts[0];
    const second = parts[1];

    if (first === 172 && second >= 16 && second <= 31) {
      return true;
    }
  }

  return false;
}

function isLocalVisit(req, ip) {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  const host = req.headers.host || "";

  const localHosts = ["localhost", "127.0.0.1", "0.0.0.0"];

  return (
    isPrivateIp(ip) ||
    localHosts.some((item) => origin.includes(item)) ||
    localHosts.some((item) => referer.includes(item)) ||
    localHosts.some((item) => host.includes(item))
  );
}

function getLocationFromIp(ip) {
  const cleanedIp = cleanIp(ip);

  if (!cleanedIp || cleanedIp === "unknown" || isPrivateIp(cleanedIp)) {
    return {
      country: "Unknown",
      city: "Unknown",
      timezone: null,
    };
  }

  const geo = geoip.lookup(cleanedIp);

  return {
    country: geo?.country || "Unknown",
    city: geo?.city || "Unknown",
    timezone: geo?.timezone || null,
  };
}

function getDeviceDetails(userAgent = "") {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const browserName = result.browser?.name || "Unknown Browser";
  const browserVersion = result.browser?.version || "";

  const osName = result.os?.name || "Unknown OS";
  const osVersion = result.os?.version || "";

  const vendor = result.device?.vendor || "";
  const model = result.device?.model || "";
  const type = result.device?.type || "desktop";

  let deviceType = "Desktop";

  if (type === "mobile") deviceType = "Phone";
  if (type === "tablet") deviceType = "Tablet";
  if (type === "smarttv") deviceType = "Smart TV";
  if (type === "wearable") deviceType = "Wearable";
  if (type === "console") deviceType = "Console";

  let deviceName = "Desktop / Laptop";

  if (vendor || model) {
    deviceName = `${vendor} ${model}`.trim();
  } else if (/iphone/i.test(userAgent)) {
    deviceName = "iPhone";
  } else if (/ipad/i.test(userAgent)) {
    deviceName = "iPad";
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    deviceName = "Mac";
  } else if (/windows/i.test(userAgent)) {
    deviceName = "Windows PC / Laptop";
  } else if (/android/i.test(userAgent)) {
    deviceName = "Android Device";
  } else if (/linux/i.test(userAgent)) {
    deviceName = "Linux Device";
  }

  let exactModel = model || "Not available";

  if (!model && /iphone/i.test(userAgent)) {
    exactModel = "iPhone model hidden by browser";
  }

  if (!model && /ipad/i.test(userAgent)) {
    exactModel = "iPad model hidden by browser";
  }

  if (!model && /macintosh|mac os x/i.test(userAgent)) {
    exactModel = "Mac model hidden by browser";
  }

  return {
    deviceType,
    deviceName,
    vendor: vendor || "Unknown",
    model: exactModel,
    os: `${osName}${osVersion ? ` ${osVersion}` : ""}`,
    browser: `${browserName}${browserVersion ? ` ${browserVersion}` : ""}`,
    rawUserAgent: userAgent || "unknown",
  };
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

    if (isLocalVisit(req, ip)) {
      return res.status(200).json({
        success: true,
        tracked: false,
        message: "Local visit ignored",
      });
    }

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
        message: "Already tracked within 5 minutes",
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
      WHERE ip IS NOT NULL
        AND ip NOT IN ('127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost', '0.0.0.0')
        AND ip NOT LIKE '10.%'
        AND ip NOT LIKE '192.168.%'
        AND NOT (
          split_part(replace(ip, '::ffff:', ''), '.', 1) = '172'
          AND split_part(replace(ip, '::ffff:', ''), '.', 2)::int BETWEEN 16 AND 31
        )
    `);

    const todayResult = await pool.query(`
      SELECT COUNT(*)::int AS today_visits
      FROM visits
      WHERE ((created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Amman')::date =
            (NOW() AT TIME ZONE 'Asia/Amman')::date
        AND ip IS NOT NULL
        AND ip NOT IN ('127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost', '0.0.0.0')
        AND ip NOT LIKE '10.%'
        AND ip NOT LIKE '192.168.%'
        AND NOT (
          split_part(replace(ip, '::ffff:', ''), '.', 1) = '172'
          AND split_part(replace(ip, '::ffff:', ''), '.', 2)::int BETWEEN 16 AND 31
        )
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

const getAnalyticsVisits = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        visitor_id,
        ip,
        user_agent,
        path,
        created_at,
        to_char(
          (created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Amman',
          'Mon DD, YYYY, HH12:MI AM'
        ) AS visited_at_label
      FROM visits
      WHERE ip IS NOT NULL
        AND ip NOT IN ('127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost', '0.0.0.0')
        AND ip NOT LIKE '10.%'
        AND ip NOT LIKE '192.168.%'
        AND NOT (
          split_part(replace(ip, '::ffff:', ''), '.', 1) = '172'
          AND split_part(replace(ip, '::ffff:', ''), '.', 2)::int BETWEEN 16 AND 31
        )
      ORDER BY created_at DESC
      LIMIT 100
    `);

    const visits = result.rows.map((visit) => {
      const location = getLocationFromIp(visit.ip);
      const device = getDeviceDetails(visit.user_agent);

      return {
        id: visit.id,
        visitorId: visit.visitor_id,
        ip: cleanIp(visit.ip),
        path: visit.path || "/",
        visitedAt: visit.created_at,
        visitedAtLabel: visit.visited_at_label,
        location,
        device,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        visits,
      },
    });
  } catch (error) {
    console.error("Get analytics visits error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get analytics visits",
    });
  }
};

module.exports = {
  trackVisit,
  getAnalytics,
  getAnalyticsVisits,
};
