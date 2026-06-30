import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminLogin from "../admin/pages/AdminLogin";
import ProtectedAdmin from "../admin/layouts/ProtectedAdmin";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminOverview from "../admin/pages/admin/AdminOverview";
import AdminPageBuilder from "../admin/pages/admin/AdminPageBuilder";
import PublicLayout from "../layouts/PublicLayout";

export default function AppRouter() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<AdminOverview />} />

          <Route path="pages/:slug" element={<AdminPageBuilder />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return <PublicLayout />;
}
