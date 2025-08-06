export const useCustomHeader = () => {
  const handleMinimize = () => window.electronAPI.minimize();
  const handleMaximize = () => window.electronAPI.maximize();
  const handleClose = () => window.electronAPI.close();

  return {
    handleMinimize,
    handleMaximize,
    handleClose,
  };
};
