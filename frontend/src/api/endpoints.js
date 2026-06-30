const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },

  PAGES: {
    ADMIN: "/pages/admin",
    ALL: "/pages",
    BY_ID: (id) => `/pages/${id}`,
    CREATE: "/pages",
    UPDATE: (id) => `/pages/${id}`,
    DELETE: (id) => `/pages/${id}`,
    ADMIN_BY_SLUG: (slug) => `/pages/admin/${slug}`,
  },

  SECTIONS: {
    BY_PAGE: (pageId) => `/sections/page/${pageId}`,
    CREATE: "/sections",
    UPDATE: (id) => `/sections/${id}`,
    DELETE: (id) => `/sections/${id}`,
  },

  BLOCKS: {
    BY_SECTION: (sectionId) => `/blocks/section/${sectionId}`,
    CREATE: "/blocks",
    UPDATE: (id) => `/blocks/${id}`,
    DELETE: (id) => `/blocks/${id}`,
  },
};

export default ENDPOINTS;
