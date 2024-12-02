import { createContext, useContext, useState } from "react";

import Toast from "./toast";

interface ToastContextProps {
  showToast: (
    message: string,
    severity: "success" | "info" | "warning" | "error",
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "info" | "warning" | "error";
    open: boolean;
    key: number;
  }>({
    message: "",
    severity: "success",
    open: false,
    key: 0,
  });

  const showToast = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
  ) => {
    setToast({ message, severity, open: true, key: Date.now() });
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        key={toast.key}
        message={toast.message}
        severity={toast.severity}
        open={toast.open}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}
