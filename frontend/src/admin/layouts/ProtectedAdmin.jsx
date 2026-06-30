import { Navigate } from "react-router-dom";
import { getToken } from "../../api/api";

export default function ProtectedAdmin({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
