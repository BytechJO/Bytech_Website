const pool = require("../database/db");

async function getBlocksBySection(req, res) {
  try {
    const { sectionId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM section_blocks
      WHERE section_id = $1
      ORDER BY sort_order ASC, id ASC
      `,
      [sectionId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get blocks error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function createBlock(req, res) {
  try {
    const {
      section_id,
      block_type,
      sort_order = 0,
      is_active = true,
      content = {},
      style = {},
    } = req.body;

    if (!section_id || !block_type) {
      return res.status(400).json({
        message: "section_id and block_type are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO section_blocks
      (section_id, block_type, sort_order, is_active, content, style)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        section_id,
        block_type,
        sort_order,
        is_active,
        JSON.stringify(content),
        JSON.stringify(style),
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create block error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateBlock(req, res) {
  try {
    const { id } = req.params;

    const { block_type, sort_order, is_active, content, style } = req.body;

    const result = await pool.query(
      `
      UPDATE section_blocks
      SET
        block_type = COALESCE($1, block_type),
        sort_order = COALESCE($2, sort_order),
        is_active = COALESCE($3, is_active),
        content = COALESCE($4, content),
        style = COALESCE($5, style),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [
        block_type ?? null,
        sort_order ?? null,
        typeof is_active === "boolean" ? is_active : null,
        content !== undefined ? JSON.stringify(content) : null,
        style !== undefined ? JSON.stringify(style) : null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Block not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update block error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteBlock(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM section_blocks
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Block not found",
      });
    }

    res.json({
      message: "Block deleted",
    });
  } catch (error) {
    console.error("Delete block error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  getBlocksBySection,
  createBlock,
  updateBlock,
  deleteBlock,
};
