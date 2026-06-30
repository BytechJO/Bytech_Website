const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getToken() {
  return localStorage.getItem("admin_token");
}

export function setAuthData(token, admin) {
  localStorage.setItem("admin_token", token);
  localStorage.setItem("admin_user", JSON.stringify(admin));
}

export function clearAuthData() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

export function getAdminUser() {
  const admin = localStorage.getItem("admin_user");

  if (!admin) return null;

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

export async function loginAdmin(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getAdminPages() {
  return apiRequest("/pages/admin");
}
export async function getSectionsByPage(pageId) {
  return apiRequest(`/sections/page/${pageId}`);
}

export async function createSection(payload) {
  return apiRequest("/sections", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateSection(id, payload) {
  return apiRequest(`/sections/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteSection(id) {
  return apiRequest(`/sections/${id}`, {
    method: "DELETE",
  });
}

export async function getBlocksBySection(sectionId) {
  return apiRequest(`/blocks/section/${sectionId}`);
}

export async function createBlock(payload) {
  return apiRequest("/blocks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBlock(id, payload) {
  return apiRequest(`/blocks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteBlock(id) {
  return apiRequest(`/blocks/${id}`, {
    method: "DELETE",
  });
}
