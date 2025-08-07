import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Toast from "./toast";
import { ToastData } from "src/types/toastData";

type ToastContextType = {
  showToast: (data: Omit<ToastData, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((data: Omit<ToastData, "id">) => {
    toastId++;
    const id = toastId;
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col space-y-2">
        {toasts.map(({ id, type, title, message, closable }) => (
          <Toast
            key={id}
            type={type}
            title={title}
            message={message}
            closable={closable}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
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
