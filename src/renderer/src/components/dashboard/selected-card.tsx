import { X as XIcon } from "lucide-react";
import { useSelected } from "./context/selected-context";
import { VideoItem } from "src/types/videoItem";
import { useToast } from "../toast/toast-context";

const SelectedCard: React.FC = () => {
  const { selected, setSelected } = useSelected();
  const { showToast } = useToast();
  const handleExclude = (video: VideoItem) => {
    setSelected((prevSelected) => prevSelected.filter((v) => v.id !== video.id));
    showToast({
      title: video.title,
      message: "removido da lista de downloads",
      type: "warm",
      closable: true,
    });
  };

  if (!selected.length) return null;

  return (
    <div className="space-y-2 border  border-redytb m-4">
      <h2 className="text-white text-xl font-bold pt-2 ml-2">Vídeos selecionados para download</h2>
      {selected.map((video) => (
        <div key={video.id} className="flex items-center space-x-3 p-2 hover:border border-redytb">
          <img
            src={video.thumbnail.thumbnails[0].url}
            alt={video.title}
            className="w-32 h-auto rounded"
          />
          <span className="text-white">{video.title}</span>
          <XIcon
            size={18}
            color="#fff"
            className="hover:cursor-pointer"
            onClick={() => handleExclude(video)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedCard;
