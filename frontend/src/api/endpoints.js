const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },

  PAGES: {
    ADMIN: "/pages/admin",
    ADMIN_BY_SLUG: (slug) => `/pages/admin/${slug}`,
    CREATE: "/pages/admin",
    UPDATE: (id) => `/pages/admin/${id}`,
    DELETE: (id) => `/pages/admin/${id}`,
    UPDATE_NAVBAR: (id) => `/pages/admin/${id}/navbar`,
    REORDER_NAVBAR: "/pages/admin/navbar/reorder",
    NAVBAR: "/pages/navbar",
    PUBLIC_BY_SLUG: (slug) => `/pages/public/${slug}`,
  },

  SECTIONS: {
    GET_ONE: (id) => `/page-sections/${id}`,
    CREATE: "/page-sections",
    UPDATE: (id) => `/page-sections/${id}`,
    DELETE: (id) => `/page-sections/${id}`,
    REORDER: (pageId) => `/page-sections/reorder/${pageId}`,
  },

  CMS_PAGES: {
    PUBLIC_BY_KEY: (pageKey) => `/cms-pages/public/${pageKey}`,
    ADMIN: "/cms-pages/admin",
    ADMIN_BY_KEY: (pageKey) => `/cms-pages/admin/${pageKey}`,
    CREATE: "/cms-pages/admin",
    UPDATE: (pageKey) => `/cms-pages/admin/${pageKey}`,
    DELETE: (pageKey) => `/cms-pages/admin/${pageKey}`,
  },

  UPLOAD: {
    IMAGE: "/upload/image",
  },
};

export default ENDPOINTS;
