import { BrowserRouter } from "react-router-dom";

import AppRouter from "./routes/AppRouter.jsx";
import { ToastProvider } from "./admin/components/ToastProvider.jsx";
import { ConfirmProvider } from "./admin/components/ConfirmProvider.jsx";
import VisitTracker from "./api/VisitTracker.js";

export default function App() {
  return (
    <BrowserRouter>
      <VisitTracker />
      <ConfirmProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ConfirmProvider>
    </BrowserRouter>
  );
}
