const pool = require("../database/db");

const getAdminPages = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM pages
      ORDER BY sort_order ASC, id ASC
      `,
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get admin pages error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAdminPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const pageResult = await pool.query(
      `
      SELECT *
      FROM pages
      WHERE slug = $1
      LIMIT 1
      `,
      [slug],
    );

    const page = pageResult.rows[0];

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    const sectionsResult = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE page_id = $1
      ORDER BY sort_order ASC, id ASC
      `,
      [page.id],
    );

    const sections = sectionsResult.rows;
    const sectionIds = sections.map((section) => section.id);

    let blocks = [];

    if (sectionIds.length > 0) {
      const blocksResult = await pool.query(
        `
        SELECT *
        FROM section_blocks
        WHERE section_id = ANY($1::int[])
        ORDER BY sort_order ASC, id ASC
        `,
        [sectionIds],
      );

      blocks = blocksResult.rows;
    }

    const sectionsWithBlocks = sections.map((section) => ({
      ...section,
      blocks: blocks.filter((block) => block.section_id === section.id),
    }));

    res.json({
      ...page,
      sections: sectionsWithBlocks,
    });
  } catch (error) {
    console.error("Get admin page by slug error:", error);

    res.status(500).json({
      message: "Failed to get page",
    });
  }
};

const getPublicPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const pageResult = await pool.query(
      `
      SELECT *
      FROM pages
      WHERE slug = $1 AND is_active = true
      LIMIT 1
      `,
      [slug],
    );

    const page = pageResult.rows[0];

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    const sectionsResult = await pool.query(
      `
      SELECT *
      FROM page_sections
      WHERE page_id = $1 AND is_active = true
      ORDER BY sort_order ASC, id ASC
      `,
      [page.id],
    );

    const sections = sectionsResult.rows;
    const sectionIds = sections.map((section) => section.id);

    let blocks = [];

    if (sectionIds.length > 0) {
      const blocksResult = await pool.query(
        `
        SELECT *
        FROM section_blocks
        WHERE section_id = ANY($1::int[]) AND is_active = true
        ORDER BY sort_order ASC, id ASC
        `,
        [sectionIds],
      );

      blocks = blocksResult.rows;
    }

    const sectionsWithBlocks = sections.map((section) => ({
      ...section,
      blocks: blocks.filter((block) => block.section_id === section.id),
    }));

    res.json({
      ...page,
      sections: sectionsWithBlocks,
    });
  } catch (error) {
    console.error("Get public page error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAdminPages,
  getAdminPageBySlug,
  getPublicPageBySlug,
};
