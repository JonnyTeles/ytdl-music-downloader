import { VideoItem } from "src/types/videoItem";
import { useSearch } from "./context/search-context";
import { useSelected } from "./context/selected-context";
import { CornerDownRight as CornerDownRightIcon, FileDownIcon } from "lucide-react";
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

  const handleAll = (videos: VideoItem[]) => {
    setSelected((prevSelected) => {
      const newVideos = videos.filter((video) => !prevSelected.some((v) => v.id === video.id));

      if (newVideos.length === 0) {
        return prevSelected;
      }

      showToast({
        type: "confirm",
        title: "Adicionado",
        message: `${newVideos.length} vídeo${newVideos.length > 1 ? "s" : ""} adicionad${newVideos.length > 1 ? "os" : "o"} à lista de downloads`,
        closable: true,
      });

      return [...prevSelected, ...newVideos];
    });
  };

  if (!results.length) return null;

  return (
    <div className="space-y-2 border  border-redytb m-2 h-full w-full">
      <div className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-white text-xl font-bold">Resultados da pesquisa</h2>
        <h3
          onClick={() => handleAll(results)}
          className="inline-flex items-center gap-2 text-white text-xl font-bold hover:text-redytb hover:underline underline-offset-4 transition-all duration-200 cursor-pointer select-none"
        >
          Selecionar tudo
          <FileDownIcon size={18} color="currentColor" />
        </h3>
      </div>
      {results.map((video, index) => (
        <div key={video.id} className="flex items-center space-x-3 p-2 hover:border border-redytb">
          <h1 className="text-white font-bold">{index + 1}</h1>
          <img
            src={video.thumbnail.thumbnails[0].url}
            alt={video.title}
            className="w-32 h-auto rounded"
          />
          <span className="text-white">{video.title}</span>
          <CornerDownRightIcon
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
