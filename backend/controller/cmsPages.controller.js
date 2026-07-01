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

async function getAdminCmsPages(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        page_key,
        title,
        is_active,
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
    const { title, is_active = true } = req.body;
    const content = normalizeContent(req.body.content);

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
        is_active
      )
      VALUES ($1, $2, $3::jsonb, $4)
      RETURNING
        id,
        page_key,
        title,
        content,
        is_active,
        created_at,
        updated_at
      `,
      [pageKey, title, JSON.stringify(content), is_active],
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
    const content = hasContent ? normalizeContent(req.body.content) : null;

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
        updated_at = CURRENT_TIMESTAMP
      WHERE page_key = $4
      RETURNING
        id,
        page_key,
        title,
        content,
        is_active,
        created_at,
        updated_at
      `,
      [
        title || null,
        hasContent ? JSON.stringify(content) : null,
        typeof is_active === "boolean" ? is_active : null,
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
  getAdminCmsPages,
  getAdminCmsPage,
  createCmsPage,
  updateCmsPage,
  deleteCmsPage,
};
