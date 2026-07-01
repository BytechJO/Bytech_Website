import { BrowserRouter } from "react-router-dom";

import AppRouter from "./routes/AppRouter.jsx";
import { ToastProvider } from "./admin/components/ToastProvider.jsx";
import { ConfirmProvider } from "./admin/components/ConfirmProvider.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ConfirmProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ConfirmProvider>
    </BrowserRouter>
  );
}
