const pool = require("../database/db");
const { deleteCloudinaryImage } = require("../utils/cloudinaryHelpers");

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const query = excludeId
      ? `
        SELECT id
        FROM pages
        WHERE slug = $1 AND id != $2
        LIMIT 1
        `
      : `
        SELECT id
        FROM pages
        WHERE slug = $1
        LIMIT 1
        `;

    const values = excludeId ? [slug, excludeId] : [slug];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

const normalizeSections = (sections = []) => {
  const result = {};

  sections.forEach((section) => {
    result[section.section_key] = {
      id: section.id,
      page_id: section.page_id,
      section_key: section.section_key,
      section_type: section.section_type,
      component_key: section.component_key,
      sort_order: section.sort_order,
      is_active: section.is_active,
      content: section.content || {},
      settings: section.settings || {},
      style: section.style || {},
      media: section.media || [],
      created_at: section.created_at,
      updated_at: section.updated_at,
    };
  });

  return result;
};

const collectPublicIdsFromSections = (sections = []) => {
  const publicIds = [];

  sections.forEach((section) => {
    const media = Array.isArray(section.media) ? section.media : [];

    media.forEach((item) => {
      if (item?.public_id) {
        publicIds.push(item.public_id);
      }
    });
  });

  return publicIds;
};

const getAdminPages = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM pages
      ORDER BY sort_order ASC, id ASC
      `,
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get admin pages error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const createPage = async (req, res) => {
  try {
    const {
      title,
      slug,
      is_active = true,
      show_in_navbar = false,
      navbar_label,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Page title is required",
      });
    }

    const finalSlug =
      slug && slug.trim() ? generateSlug(slug) : await getUniqueSlug(title);

    if (!finalSlug) {
      return res.status(400).json({
        message: "Invalid slug",
      });
    }

    const slugCheck = await pool.query(
      `
      SELECT id
      FROM pages
      WHERE slug = $1
      LIMIT 1
      `,
      [finalSlug],
    );

    if (slugCheck.rows.length > 0) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    const orderResult = await pool.query(
      `
      SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_order
      FROM pages
      `,
    );

    const nextOrder = orderResult.rows[0].next_order;

    const navbarOrderResult = await pool.query(
      `
      SELECT COALESCE(MAX(navbar_order), 0) + 1 AS next_navbar_order
      FROM pages
      WHERE show_in_navbar = true
      `,
    );

    const nextNavbarOrder = navbarOrderResult.rows[0].next_navbar_order;
    const finalLabel = navbar_label?.trim() || title.trim();

    const result = await pool.query(
      `
      INSERT INTO pages (
        title,
        slug,
        nav_label,
        is_active,
        show_in_navbar,
        navbar_order,
        sort_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        title.trim(),
        finalSlug,
        finalLabel,
        is_active,
        show_in_navbar,
        show_in_navbar ? nextNavbarOrder : 0,
        nextOrder,
      ],
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create page error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      is_active = true,
      show_in_navbar = false,
      navbar_label,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Page title is required",
      });
    }

    const currentResult = await pool.query(
      `
      SELECT *
      FROM pages
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const currentPage = currentResult.rows[0];

    if (!currentPage) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    const finalSlug =
      slug && slug.trim() ? generateSlug(slug) : await getUniqueSlug(title, id);

    if (!finalSlug) {
      return res.status(400).json({
        message: "Invalid slug",
      });
    }

    const slugCheck = await pool.query(
      `
      SELECT id
      FROM pages
      WHERE slug = $1 AND id != $2
      LIMIT 1
      `,
      [finalSlug, id],
    );

    if (slugCheck.rows.length > 0) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    let finalNavbarOrder = currentPage.navbar_order || 0;

    if (show_in_navbar && !currentPage.show_in_navbar) {
      const navbarOrderResult = await pool.query(
        `
        SELECT COALESCE(MAX(navbar_order), 0) + 1 AS next_navbar_order
        FROM pages
        WHERE show_in_navbar = true
        `,
      );

      finalNavbarOrder = navbarOrderResult.rows[0].next_navbar_order;
    }

    if (!show_in_navbar) {
      finalNavbarOrder = 0;
    }

    const finalLabel = navbar_label?.trim() || title.trim();

    const result = await pool.query(
      `
      UPDATE pages
      SET
        title = $1,
        slug = $2,
        nav_label = $3,
        is_active = $4,
        show_in_navbar = $5,
        navbar_order = $6,
        updated_at = NOW()
      WHERE id = $7
      RETURNING *
      `,
      [
        title.trim(),
        finalSlug,
        finalLabel,
        is_active,
        show_in_navbar,
        finalNavbarOrder,
        id,
      ],
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update page error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePage = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    const pageResult = await client.query(
      `
      SELECT *
      FROM pages
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const page = pageResult.rows[0];

    if (!page) {
      client.release();

      return res.status(404).json({
        message: "Page not found",
      });
    }

    const sectionsResult = await client.query(
      `
      SELECT media
      FROM page_sections
      WHERE page_id = $1
      `,
      [id],
    );

    const publicIds = collectPublicIdsFromSections(sectionsResult.rows);

    await client.query("BEGIN");

    await client.query(
      `
      DELETE FROM pages
      WHERE id = $1
      `,
      [id],
    );

    await client.query("COMMIT");

    client.release();

    for (const publicId of publicIds) {
      await deleteCloudinaryImage(publicId);
    }

    return res.json({
      message: "Page deleted successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    client.release();

    console.error("Delete page error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
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

    return res.json({
      page,
      sections: normalizeSections(sectionsResult.rows),
      sectionsList: sectionsResult.rows,
    });
  } catch (error) {
    console.error("Get admin page by slug error:", error);

    return res.status(500).json({
      message: "Failed to get page",
      error: error.message,
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

    return res.json({
      page,
      sections: normalizeSections(sectionsResult.rows),
    });
  } catch (error) {
    console.error("Get public page error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updatePageNavbarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { show_in_navbar, navbar_order, navbar_label } = req.body;

    const currentResult = await pool.query(
      `
      SELECT *
      FROM pages
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    const currentPage = currentResult.rows[0];

    if (!currentPage) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    let finalNavbarOrder = navbar_order ?? currentPage.navbar_order ?? 0;

    if (show_in_navbar && !currentPage.show_in_navbar && !navbar_order) {
      const orderResult = await pool.query(
        `
        SELECT COALESCE(MAX(navbar_order), 0) + 1 AS next_navbar_order
        FROM pages
        WHERE show_in_navbar = true
        `,
      );

      finalNavbarOrder = orderResult.rows[0].next_navbar_order;
    }

    if (!show_in_navbar) {
      finalNavbarOrder = 0;
    }

    const result = await pool.query(
      `
      UPDATE pages
      SET
        show_in_navbar = $1,
        navbar_order = $2,
        nav_label = COALESCE($3, nav_label, title),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
      `,
      [show_in_navbar, finalNavbarOrder, navbar_label, id],
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update page navbar status error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getNavbarPages = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        slug,
        title,
        COALESCE(nav_label, title) AS navbar_label,
        navbar_order
      FROM pages
      WHERE is_active = true
        AND show_in_navbar = true
      ORDER BY navbar_order ASC, id ASC
      `,
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get navbar pages error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const reorderNavbarPages = async (req, res) => {
  try {
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
        UPDATE pages
        SET
          navbar_order = $1,
          updated_at = NOW()
        WHERE id = $2
        `,
        [item.navbar_order, item.id],
      );
    }

    await pool.query("COMMIT");

    return res.json({
      message: "Navbar order updated successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("Reorder navbar pages error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminPages,
  createPage,
  updatePage,
  deletePage,
  getAdminPageBySlug,
  getPublicPageBySlug,
  updatePageNavbarStatus,
  getNavbarPages,
  reorderNavbarPages,
};
