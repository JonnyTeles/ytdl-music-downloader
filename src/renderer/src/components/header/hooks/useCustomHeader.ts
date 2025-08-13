import { useNavigate } from "react-router-dom";

export const useCustomHeader = () => {
  const navigate = useNavigate();

  const handleMinimize = () => window.electronAPI.minimize();
  const handleMaximize = () => window.electronAPI.maximize();
  const handleClose = () => window.electronAPI.close();
  const handleConfigPage = () => navigate("/config");

  return {
    handleMinimize,
    handleMaximize,
    handleClose,
    handleConfigPage,
  };
};
