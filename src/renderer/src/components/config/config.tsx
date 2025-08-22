import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "./checkbox";

const ConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateDashboard = () => navigate("/");

  const [folder, setFolder] = useState<string>("");
  const [openFolder, setOpenFolder] = useState(false);

  useEffect(() => {
    const initloadFolder = async () => {
      const path = await window.electronAPI.getFolderPath();
      setFolder(path);
    };
    const initOpenFolder = async () => {
      const open = await window.electronAPI.getOpenFolder();
      setOpenFolder(open);
    };
    initOpenFolder();
    initloadFolder();
  }, []);

  const handleSelectFolder = async () => {
    const path = await window.electronAPI.selectFolder();
    setFolder(path);
  };

  const handleOpenFolder = (checked: boolean) => {
    setOpenFolder(checked);
    window.electronAPI.setOpenFolder(checked);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-background rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-white text-xl font-semibold text-center">
        Local onde as músicas serão salvas
      </h1>

      <p
        className="cursor-pointer text-white text-sm font-medium truncate bg-secondary px-3 py-2 rounded w-full text-center"
        title={folder}
        onClick={handleSelectFolder}
      >
        {folder || "Nenhum local selecionado"}
      </p>

      <div className="flex gap-4">
        <Checkbox
          message="Abrir pasta após download"
          onChecked={handleOpenFolder}
          checked={openFolder}
        />
        <button
          onClick={handleNavigateDashboard}
          className="px-6 py-2 bg-redytb text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          CONFIRMAR
        </button>
      </div>
    </div>
  );
};

export default ConfigPage;
