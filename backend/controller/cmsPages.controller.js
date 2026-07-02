const pool = require("../database/db");

function normalizePageKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function normalizeContent(content) {
  if (!content || typeof content !== "object") {
    return {};
  }

  return content;
}

function normalizeNavLabel(value, fallback = "") {
  const label = String(value || "").trim();

  return label || fallback;
}

function normalizeNavbarOrder(value) {
  const order = Number(value);

  if (!Number.isFinite(order)) return 0;

  return Math.max(0, Math.trunc(order));
}

async function getPublicCmsPage(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);

    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        content,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order,
        updated_at
      FROM cms_pages
      WHERE page_key = $1
        AND is_active = true
      LIMIT 1
      `,
      [pageKey],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get public CMS page error:", error);
    return res.status(500).json({
      message: "Failed to load page",
    });
  }
}

async function getPublicNavbarCmsPages(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        nav_label,
        navbar_order
      FROM cms_pages
      WHERE is_active = true
        AND show_in_navbar = true
      ORDER BY navbar_order ASC, id ASC
      `,
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get public CMS navbar pages error:", error);
    return res.status(500).json({
      message: "Failed to load navbar pages",
    });
  }
}

async function getAdminCmsPages(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order,
        jsonb_typeof(content) AS content_type,
        created_at,
        updated_at
      FROM cms_pages
      ORDER BY updated_at DESC, id DESC
      `,
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get admin CMS pages error:", error);
    return res.status(500).json({
      message: "Failed to load pages",
    });
  }
}

async function getAdminCmsPage(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);

    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        content,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order,
        created_at,
        updated_at
      FROM cms_pages
      WHERE page_key = $1
      LIMIT 1
      `,
      [pageKey],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get admin CMS page error:", error);
    return res.status(500).json({
      message: "Failed to load page",
    });
  }
}

async function createCmsPage(req, res) {
  try {
    const pageKey = normalizePageKey(req.body.page_key || req.body.pageKey);

    const { title, is_active = true, show_in_navbar = false } = req.body;

    const content = normalizeContent(req.body.content);
    const navLabel = normalizeNavLabel(
      req.body.nav_label || req.body.navLabel,
      title,
    );
    const navbarOrder = normalizeNavbarOrder(
      req.body.navbar_order ?? req.body.navbarOrder,
    );

    if (!pageKey || !title) {
      return res.status(400).json({
        message: "page_key and title are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO cms_pages (
        page_key,
        title,
        content,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order
      )
      VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7)
      RETURNING
        id,
        page_key,
        title,
        content,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order,
        created_at,
        updated_at
      `,
      [
        pageKey,
        title,
        JSON.stringify(content),
        is_active,
        navLabel,
        show_in_navbar,
        navbarOrder,
      ],
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create CMS page error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Page key already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to create page",
    });
  }
}

async function updateCmsPage(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);

    const { title, is_active } = req.body;

    const hasContent = Object.prototype.hasOwnProperty.call(
      req.body,
      "content",
    );

    const hasNavLabel =
      Object.prototype.hasOwnProperty.call(req.body, "nav_label") ||
      Object.prototype.hasOwnProperty.call(req.body, "navLabel");

    const hasShowInNavbar =
      Object.prototype.hasOwnProperty.call(req.body, "show_in_navbar") ||
      Object.prototype.hasOwnProperty.call(req.body, "showInNavbar");

    const hasNavbarOrder =
      Object.prototype.hasOwnProperty.call(req.body, "navbar_order") ||
      Object.prototype.hasOwnProperty.call(req.body, "navbarOrder");

    const content = hasContent ? normalizeContent(req.body.content) : null;

    const navLabel = hasNavLabel
      ? normalizeNavLabel(req.body.nav_label || req.body.navLabel, title)
      : null;

    const showInNavbar = hasShowInNavbar
      ? Boolean(req.body.show_in_navbar ?? req.body.showInNavbar)
      : null;

    const navbarOrder = hasNavbarOrder
      ? normalizeNavbarOrder(req.body.navbar_order ?? req.body.navbarOrder)
      : null;

    const result = await pool.query(
      `
      UPDATE cms_pages
      SET
        title = COALESCE($1, title),
        content = CASE
          WHEN $2::jsonb IS NULL THEN content
          ELSE $2::jsonb
        END,
        is_active = COALESCE($3, is_active),
        nav_label = COALESCE($4, nav_label),
        show_in_navbar = COALESCE($5, show_in_navbar),
        navbar_order = COALESCE($6, navbar_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE page_key = $7
      RETURNING
        id,
        page_key,
        title,
        content,
        is_active,
        nav_label,
        show_in_navbar,
        navbar_order,
        created_at,
        updated_at
      `,
      [
        title || null,
        hasContent ? JSON.stringify(content) : null,
        typeof is_active === "boolean" ? is_active : null,
        navLabel,
        showInNavbar,
        navbarOrder,
        pageKey,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update CMS page error:", error);
    return res.status(500).json({
      message: "Failed to update page",
    });
  }
}

async function updateCmsPageNavbarStatus(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);

    const showInNavbar = req.body.show_in_navbar ?? req.body.showInNavbar;

    const navLabel = req.body.nav_label ?? req.body.navLabel;

    if (typeof showInNavbar !== "boolean") {
      return res.status(400).json({
        message: "show_in_navbar must be boolean",
      });
    }

    const result = await pool.query(
      `
      UPDATE cms_pages
      SET
        show_in_navbar = $1,
        nav_label = COALESCE($2, nav_label),
        updated_at = CURRENT_TIMESTAMP
      WHERE page_key = $3
      RETURNING
        id,
        page_key,
        title,
        nav_label,
        show_in_navbar,
        navbar_order,
        updated_at
      `,
      [showInNavbar, navLabel ? normalizeNavLabel(navLabel) : null, pageKey],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update CMS navbar status error:", error);
    return res.status(500).json({
      message: "Failed to update navbar status",
    });
  }
}

async function updateCmsPageNavbarOrder(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);
    const navbarOrder = normalizeNavbarOrder(
      req.body.navbar_order ?? req.body.navbarOrder,
    );

    const result = await pool.query(
      `
      UPDATE cms_pages
      SET
        navbar_order = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE page_key = $2
      RETURNING
        id,
        page_key,
        title,
        nav_label,
        show_in_navbar,
        navbar_order,
        updated_at
      `,
      [navbarOrder, pageKey],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update CMS navbar order error:", error);
    return res.status(500).json({
      message: "Failed to update navbar order",
    });
  }
}

async function reorderCmsNavbarPages(req, res) {
  const client = await pool.connect();

  try {
    const pages = Array.isArray(req.body.pages) ? req.body.pages : [];

    if (!pages.length) {
      return res.status(400).json({
        message: "pages array is required",
      });
    }

    await client.query("BEGIN");

    for (let index = 0; index < pages.length; index++) {
      const item = pages[index];

      const pageKey = normalizePageKey(item.page_key || item.pageKey);
      const navbarOrder = normalizeNavbarOrder(
        item.navbar_order ?? item.navbarOrder ?? index,
      );

      if (!pageKey) continue;

      await client.query(
        `
        UPDATE cms_pages
        SET
          navbar_order = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE page_key = $2
        `,
        [navbarOrder, pageKey],
      );
    }

    await client.query("COMMIT");

    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        nav_label,
        show_in_navbar,
        navbar_order,
        updated_at
      FROM cms_pages
      WHERE show_in_navbar = true
      ORDER BY navbar_order ASC, id ASC
      `,
    );

    return res.json({
      message: "Navbar pages reordered successfully",
      pages: result.rows,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Reorder CMS navbar pages error:", error);
    return res.status(500).json({
      message: "Failed to reorder navbar pages",
    });
  } finally {
    client.release();
  }
}

async function deleteCmsPage(req, res) {
  try {
    const pageKey = normalizePageKey(req.params.pageKey);

    const result = await pool.query(
      `
      DELETE FROM cms_pages
      WHERE page_key = $1
      RETURNING id, page_key
      `,
      [pageKey],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    return res.json({
      message: "Page deleted successfully",
      page: result.rows[0],
    });
  } catch (error) {
    console.error("Delete CMS page error:", error);
    return res.status(500).json({
      message: "Failed to delete page",
    });
  }
}

module.exports = {
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
};
