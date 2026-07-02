const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },

  CMS_PAGES: {
    PUBLIC_BY_KEY: (pageKey) => `/cms-pages/public/${pageKey}`,
    PUBLIC_NAVBAR: "/cms-pages/public/navbar",

    ADMIN: "/cms-pages/admin",
    ADMIN_BY_KEY: (pageKey) => `/cms-pages/admin/${pageKey}`,
    CREATE: "/cms-pages/admin",
    UPDATE: (pageKey) => `/cms-pages/admin/${pageKey}`,
    DELETE: (pageKey) => `/cms-pages/admin/${pageKey}`,

    UPDATE_NAVBAR_STATUS: (pageKey) =>
      `/cms-pages/admin/${pageKey}/navbar-status`,

    UPDATE_NAVBAR_ORDER: (pageKey) =>
      `/cms-pages/admin/${pageKey}/navbar-order`,

    REORDER_NAVBAR: "/cms-pages/admin/navbar/reorder",
  },
  UPLOAD: {
    IMAGE: "/upload/image",
  },
  CONTACT: {
    PUBLIC_CREATE: "/contact",

    ADMIN: "/contact/admin",
    ADMIN_BY_ID: (id) => `/contact/admin/${id}`,
    UPDATE_STATUS: (id) => `/contact/admin/${id}`,
    DELETE: (id) => `/contact/admin/${id}`,
  },

  NOTIFICATIONS: {
    ADMIN: "/notifications",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    DELETE: (id) => `/notifications/${id}`,
  },
};

export default ENDPOINTS;
