import { VideoItem } from "src/types/videoItem";
import { useSearch } from "./context/search-context";
import { useSelected } from "./context/selected-context";
import { Download as DownloadIcon } from "lucide-react";
import { useToast } from "../toast/toast-context";

const ResultsCard: React.FC = () => {
  const { results } = useSearch();
  //TODO: Mover pra um hook
  const { setSelected } = useSelected();
  const { showToast } = useToast();

  const handleSelected = (video: VideoItem) => {
    setSelected((prevSelected) => {
      if (prevSelected.some((v) => v.id === video.id)) {
        showToast({
          type: "error",
          title: video.title,
          message: `já está na lista de downloads`,
          closable: true,
        });
        return prevSelected;
      }
      showToast({
        type: "confirm",
        title: video.title,
        message: `adicionado a lista de downloads`,
        closable: true,
      });
      return [...prevSelected, video];
    });
  };

  if (!results.length) return null;

  return (
    <div className="space-y-2 border  border-redytb m-2">
      <h2 className="text-white text-xl font-bold pt-2 ml-2">Resultados da pesquisa</h2>
      {results.map((video) => (
        <div key={video.id} className="flex items-center space-x-3 p-2 hover:border border-redytb">
          <img
            src={video.thumbnail.thumbnails[0].url}
            alt={video.title}
            className="w-32 h-auto rounded"
          />
          <span className="text-white">{video.title}</span>
          <DownloadIcon
            size={18}
            color="#fff"
            className="hover:cursor-pointer"
            onClick={() => handleSelected(video)}
          />
        </div>
      ))}
    </div>
  );
};

export default ResultsCard;
