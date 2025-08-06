import ControlButtons from "./control-buttons";
import imagePath from "../../assets/icon.png";

const HeaderControl: React.FC = () => (
  <div className="flex items-center justify-between bg-primary text-white px-4 py-2 select-none border-b border-redytb drag-region">
    <div className="flex items-center space-x-2">
      <img src={imagePath} alt="icon" className="w-10 h-10" />
      <h1 className="text-lg font-semibold leading-none">Youtube Music Downloader</h1>
    </div>
    <ControlButtons />
  </div>
);

export default HeaderControl;
