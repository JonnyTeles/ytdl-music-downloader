import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Toast from "./toast";
import { ToastData } from "src/types/toastData";

type ToastContextType = {
  showToast: (data: Omit<ToastData, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Omit<ToastData, "id"> | null>(null);
  const [key, setKey] = useState(0);

  const showToast = useCallback((data: Omit<ToastData, "id">) => {
    setToast(null);
    setTimeout(() => {
      setToast(data);
      setKey((prev) => prev + 1);
    }, 50);
  }, []);

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Toast
            key={key}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            closable={toast.closable ?? true}
            onClose={handleClose}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
