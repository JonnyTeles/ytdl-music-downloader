import { useState, useCallback, ReactNode } from "react";
import Toast from "./toast";
import { ToastData } from "src/types/toastData";

export const useToast = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((data: ToastData) => {
    setToast(data);
  }, []);

  const ToastRenderer = (): ReactNode => {
    if (!toast) return null;
    return (
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast(null)}
        closable={toast.closable}
      />
    );
  };

  return { showToast, ToastRenderer };
};
