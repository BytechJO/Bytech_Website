const pool = require("../database/db");

async function getSectionsByPage(req, res) {
  try {
    const { pageId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE page_id = $1
      ORDER BY sort_order ASC, id ASC
      `,
      [pageId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get sections error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function createSection(req, res) {
  try {
    const {
      page_id,
      section_name,
      section_type = "custom",
      sort_order = 0,
      is_active = true,
      settings = {},
    } = req.body;

    if (!page_id || !section_name) {
      return res.status(400).json({
        message: "page_id and section_name are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO page_sections
      (page_id, section_name, section_type, sort_order, is_active, settings)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        page_id,
        section_name,
        section_type,
        sort_order,
        is_active,
        JSON.stringify(settings),
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create section error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateSection(req, res) {
  try {
    const { id } = req.params;

    const { section_name, section_type, sort_order, is_active, settings } =
      req.body;

    const result = await pool.query(
      `
      UPDATE page_sections
      SET
        section_name = COALESCE($1, section_name),
        section_type = COALESCE($2, section_type),
        sort_order = COALESCE($3, sort_order),
        is_active = COALESCE($4, is_active),
        settings = COALESCE($5, settings),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [
        section_name ?? null,
        section_type ?? null,
        sort_order ?? null,
        typeof is_active === "boolean" ? is_active : null,
        settings !== undefined ? JSON.stringify(settings) : null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update section error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteSection(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM page_sections
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    res.json({
      message: "Section deleted",
    });
  } catch (error) {
    console.error("Delete section error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  getSectionsByPage,
  createSection,
  updateSection,
  deleteSection,
};
