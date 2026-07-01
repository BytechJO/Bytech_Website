import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

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

export async function loginAdmin(email, password) {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });

  return response.data;
}
