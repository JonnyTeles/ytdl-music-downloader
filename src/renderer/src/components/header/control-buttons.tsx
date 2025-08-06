import { useCustomHeader } from "./hooks/useCustomHeader";

const ControlButtons: React.FC = () => {
  const { handleClose, handleMaximize, handleMinimize } = useCustomHeader();
  //TODO AJEITAR OS ICONS DOS BOTÕES
  return (
    <div className="flex space-x-2 no-drag">
      <button
        id="minimize"
        title="Minimizar"
        className="w-11 h-7 flex items-center justify-center ml-1 rounded cursor-pointer bg-transparent text-white transition-colors duration-200 hover:bg-white/10"
        onClick={handleMinimize}
      >
        —
      </button>
      <button
        id="maximize"
        title="Maximizar"
        className="w-11 h-7 flex items-center justify-center ml-1 rounded cursor-pointer bg-transparent text-white transition-colors duration-200 hover:bg-white/10"
        onClick={handleMaximize}
      >
        ☐
      </button>
      <button
        id="close"
        title="Fechar"
        className="w-11 h-7 flex items-center justify-center ml-1 rounded cursor-pointer bg-transparent text-white transition-colors duration-200 hover:bg-[#FF0000]"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  );
};

export default ControlButtons;
