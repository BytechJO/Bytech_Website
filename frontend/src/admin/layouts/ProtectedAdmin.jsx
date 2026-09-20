import { Navigate } from "react-router-dom";
import { getToken, clearAuthData } from "../../api/api";

function isTokenValid(token) {
  if (!token) return false;

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return false;
    }

    const base64Url = parts[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    if (!payload.exp) {
      return false;
    }

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function ProtectedAdmin({ children }) {
  const token = getToken();

  if (!isTokenValid(token)) {
    clearAuthData();

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
