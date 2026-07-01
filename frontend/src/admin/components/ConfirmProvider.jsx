import { createContext, useContext, useState } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [confirmState, setConfirmState] = useState(null);

  const confirm = ({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    danger = true,
  }) => {
    return new Promise((resolve) => {
      setConfirmState({
        title,
        message,
        confirmText,
        cancelText,
        danger,
        resolve,
      });
    });
  };

  const handleCancel = () => {
    confirmState?.resolve(false);
    setConfirmState(null);
  };

  const handleConfirm = () => {
    confirmState?.resolve(true);
    setConfirmState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {confirmState && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[460px] rounded-[30px] border border-white/[0.08] bg-[#112233] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  confirmState.danger
                    ? "bg-red-400/10 text-red-300"
                    : "bg-[#F57A24]/15 text-[#F57A24]"
                }`}
              >
                <AlertTriangle size={22} />
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="text-[24px] font-black tracking-[-0.8px] text-white">
              {confirmState.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/45">
              {confirmState.message}
            </p>

            <div className="mt-7 flex justify-end gap-3 border-t border-white/[0.07] pt-5">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/50 transition hover:text-white"
              >
                {confirmState.cancelText}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white transition ${
                  confirmState.danger
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#F57A24] hover:bg-[#e06815]"
                }`}
              >
                {confirmState.danger && <Trash2 size={17} />}
                {confirmState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirm() {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }

  return context;
}
