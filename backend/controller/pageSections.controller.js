const pool = require("../database/db");
const { deleteCloudinaryImage } = require("../utils/cloudinaryHelpers");
const { getRemovedPublicIds } = require("../utils/mediaHelpers");

const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const section = result.rows[0];

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    return res.json(section);
  } catch (error) {
    console.error("Get section error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const createSection = async (req, res) => {
  try {
    const {
      page_id,
      section_key,
      section_type,
      component_key = null,
      is_active = true,
      content = {},
      settings = {},
      style = {},
      media = [],
    } = req.body;

    if (!page_id) {
      return res.status(400).json({
        message: "Page ID is required",
      });
    }

    if (!section_key || !section_key.trim()) {
      return res.status(400).json({
        message: "Section key is required",
      });
    }

    if (!section_type || !section_type.trim()) {
      return res.status(400).json({
        message: "Section type is required",
      });
    }

    const pageResult = await pool.query(
      `
      SELECT id
      FROM pages
      WHERE id = $1
      LIMIT 1
      `,
      [page_id],
    );

    if (pageResult.rows.length === 0) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    const orderResult = await pool.query(
      `
      SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_order
      FROM page_sections
      WHERE page_id = $1
      `,
      [page_id],
    );

    const nextOrder = orderResult.rows[0].next_order;

    const result = await pool.query(
      `
      INSERT INTO page_sections (
        page_id,
        section_key,
        section_type,
        component_key,
        sort_order,
        is_active,
        content,
        settings,
        style,
        media
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        page_id,
        section_key.trim(),
        section_type.trim(),
        component_key,
        nextOrder,
        is_active,
        content,
        settings,
        style,
        media,
      ],
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create section error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Section key already exists for this page",
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    const oldResult = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const oldSection = oldResult.rows[0];

    if (!oldSection) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    const {
      section_key,
      section_type,
      component_key,
      sort_order,
      is_active,
      content,
      settings,
      style,
      media,
    } = req.body;

    const finalMedia = Array.isArray(media) ? media : oldSection.media || [];

    const removedPublicIds = getRemovedPublicIds(
      oldSection.media || [],
      finalMedia,
    );

    const result = await pool.query(
      `
      UPDATE page_sections
      SET
        section_key = $1,
        section_type = $2,
        component_key = $3,
        sort_order = $4,
        is_active = $5,
        content = $6,
        settings = $7,
        style = $8,
        media = $9,
        updated_at = NOW()
      WHERE id = $10
      RETURNING *
      `,
      [
        section_key ?? oldSection.section_key,
        section_type ?? oldSection.section_type,
        component_key ?? oldSection.component_key,
        typeof sort_order === "number" ? sort_order : oldSection.sort_order,
        typeof is_active === "boolean" ? is_active : oldSection.is_active,
        content ?? oldSection.content,
        settings ?? oldSection.settings,
        style ?? oldSection.style,
        finalMedia,
        id,
      ],
    );

    for (const publicId of removedPublicIds) {
      await deleteCloudinaryImage(publicId);
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update section error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Section key already exists for this page",
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const sectionResult = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const section = sectionResult.rows[0];

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    await pool.query(
      `
      DELETE FROM page_sections
      WHERE id = $1
      `,
      [id],
    );

    const media = Array.isArray(section.media) ? section.media : [];

    for (const item of media) {
      if (item.public_id) {
        await deleteCloudinaryImage(item.public_id);
      }
    }

    return res.json({
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Delete section error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const reorderSections = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Items must be an array",
      });
    }

    await pool.query("BEGIN");

    for (const item of items) {
      await pool.query(
        `
        UPDATE page_sections
        SET
          sort_order = $1,
          updated_at = NOW()
        WHERE id = $2 AND page_id = $3
        `,
        [item.sort_order, item.id, pageId],
      );
    }

    await pool.query("COMMIT");

    return res.json({
      message: "Sections order updated successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("Reorder sections error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
};
