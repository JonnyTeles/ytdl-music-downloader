import { X as XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  type: "error" | "confirm" | "warm";
  title?: string;
  message?: string;
  closable?: boolean;
  onClose: () => void;
};

const Toast: React.FC<Props> = ({ type, title, message, onClose, closable }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  if (!visible) return null;

  const colors = {
    confirm: "bg-primary border border-redytb",
    error: "bg-redytb",
    warm: "bg-secondary border border-redytb",
  };

  return (
    <div className={`relative px-6 py-3 rounded shadow-lg text-white ${colors[type]}`} role="alert">
      {closable && (
        <button
          onClick={handleClose}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition"
          aria-label="Fechar"
        >
          <XIcon size={18} color="#fff" />
        </button>
      )}
      {title && <h1 className="font-bold text-center mb-1">{title}</h1>}
      <h3 className="text-center">{message}</h3>
    </div>
  );
};
export default Toast;
