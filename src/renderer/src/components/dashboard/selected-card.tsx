import {
  X as XIcon,
  CircleX as CicrcleXIcon,
  ArrowDownToLine as ArrowDownToLineIcon,
  ArrowBigDownDash as ArrowBigDownDasIcon,
} from "lucide-react";
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

  const handleExcludeAll = () => {
    setSelected([]);
    showToast({
      type: "confirm",
      title: "Adicionado",
      message: `${selected?.length} vídeos removidos da lista de download`,
      closable: true,
    });
  };

  //TODO: ORGANIZAR TUDO
  const handleDownloadSingle = async (videoItem: Partial<VideoItem>) => {
    try {
      const link = `https://www.youtube.com/watch?v=${videoItem.id}`;
      await window.electronAPI.download([link]);
      return showToast({
        type: "confirm",
        title: videoItem.title,
        message: `Download concluído`,
        closable: true,
      });
    } catch (err: any) {
      const msg = err.message || err.toString();
      const cleanMsg = msg.split("Error:").pop().trim();
      return showToast({
        type: "error",
        title: "Erro ao baixar música",
        message: `${cleanMsg.replace("$(music)", videoItem.title)}`,
        closable: true,
      });
    }
  };
  //TODO: LOADING E CONTADOR DE MUSICAS JA BAIXADAS...
  const handleDownloadAll = async (videoItem: Partial<VideoItem[]>) => {
    let playlistLength = videoItem.length;
    for (const video of videoItem) {
      try {
        const link = `https://www.youtube.com/watch?v=${video?.id}`;
        await window.electronAPI.download([link]);
        showToast({
          type: "confirm",
          title: video?.title,
          message: `Baixado com sucesso`,
          closable: true,
        });
      } catch (err: any) {
        const msg = err.message || err.toString();
        const cleanMsg = msg.split("Error:").pop().trim();
        if (cleanMsg.includes("$(music) já foi baixada.")) {
          showToast({
            type: "error",
            title: "Erro ao baixar música",
            message: `${cleanMsg.replace("$(music)", video?.title)}`,
            closable: true,
          });
          playlistLength -= 1;
        }
      }
    }
    if (playlistLength > 0)
      showToast({
        type: "confirm",
        title: `Download concluído`,
        message: `${playlistLength} músicas baixadas`,
        closable: true,
      });
  };

  if (!selected.length) return null;
  //TODO: ADICIONAR "... EM ITENS COM TITULO GRANDE E TOOLTIP (NO RESULT-CARD TBM)
  return (
    <div className="space-y-2 border  border-redytb m-2 h-full w-full">
      <div className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-white text-xl font-bold pt-2 ml-2">
          Vídeos selecionados para download ({selected.length})
        </h2>
        <h3
          onClick={handleExcludeAll}
          className="inline-flex items-center gap-2 text-white text-xl font-bold hover:text-redytb hover:underline underline-offset-4 transition-all duration-200 cursor-pointer select-none"
        >
          Remover tudo
          <CicrcleXIcon size={18} color="currentColor" />
        </h3>
        <h3
          onClick={() => handleDownloadAll(selected)}
          className="inline-flex items-center gap-2 text-white text-xl font-bold hover:text-redytb hover:underline underline-offset-4 transition-all duration-200 cursor-pointer select-none"
        >
          Baixar Todos
          <ArrowBigDownDasIcon size={18} color="currentColor" />
        </h3>
      </div>
      {selected.map((video, index) => (
        <div key={video.id} className="flex items-center space-x-3 p-2 hover:border border-redytb">
          <h1 className="text-white font-bold">{index + 1}</h1>
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
          <ArrowDownToLineIcon
            size={18}
            color="#fff"
            className="hover:cursor-pointer"
            onClick={() => handleDownloadSingle(video)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedCard;
