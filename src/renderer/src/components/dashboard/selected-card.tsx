import {
  X as XIcon,
  CircleX as CicrcleXIcon,
  ArrowDownToLine as ArrowDownToLineIcon,
  ArrowBigDownDash as ArrowBigDownDasIcon,
} from "lucide-react";
import { useSelected } from "./context/selected-context";
import { VideoItem } from "src/types/videoItem";
import { useToast } from "../toast/toast-context";
import { useLoading } from "../loading/loading-context";
import { useEffect } from "react";
//TODO CRIAR HOOK PRA ORGANIZAR
const SelectedCard: React.FC = () => {
  const { selected, setSelected } = useSelected();
  const { showToast } = useToast();
  const { setLoading } = useLoading();

  useEffect(() => {
    let done = 0;

    const handler = () => {
      done += 1;
      const total = selected.length;
      setLoading(true, `Baixando músicas...`, { done, total });
    };

    window.electronAPI.onDownloadProgress(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
      title: "Removido",
      message: `${selected?.length} vídeos removidos da lista de download`,
      closable: true,
    });
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
    if (minutes > 0) return `${minutes}min ${seconds}s`;
    return `${seconds}s`;
  };

  //TODO: ORGANIZAR TUDO
  const handleDownloadSingle = async (videoItem: Partial<VideoItem>) => {
    setLoading(true, `Baixando ${videoItem.title}`);
    const startTime = Date.now();
    try {
      const link = `https://www.youtube.com/watch?v=${videoItem.id}`;
      await window.electronAPI.download([link]);
      const endTime = Date.now();
      const duration = formatDuration(endTime - startTime);
      setLoading(false);
      return showToast({
        type: "confirm",
        title: videoItem.title,
        message: `Download concluído em ${duration}`,
        closable: true,
      });
    } catch (err: any) {
      const msg = err.message || err.toString();
      const cleanMsg = msg.split("Error:").pop().trim();
      setLoading(false);
      return showToast({
        type: "error",
        title: "Erro ao baixar música",
        message: `${cleanMsg.replace("$(music)", videoItem.title)}`,
        closable: true,
      });
    }
  };

  const handleDownloadAll = async (videoItems: Partial<VideoItem[]>) => {
    if (!videoItems.length) return;

    const links = videoItems.map((v) => `https://www.youtube.com/watch?v=${v?.id}`);
    setLoading(true, `Baixando ${links.length} músicas`, { done: 0, total: links.length });

    const startTime = Date.now();

    try {
      await window.electronAPI.download(links);

      const endTime = Date.now();
      const duration = formatDuration(endTime - startTime);

      showToast({
        type: "confirm",
        title: "Download concluído",
        message: `${links.length} músicas baixadas em ${duration}`,
        closable: true,
      });
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Erro ao baixar músicas",
        message: err.message || "Falha desconhecida",
        closable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  if (!selected.length) return null;
  //TODO: ADICIONAR "... EM ITENS COM TITULO GRANDE E TOOLTIP (NO RESULT-CARD TBM)
  return (
    <div className="space-y-2 border border-redytb m-2 h-full w-full">
      <div className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-white text-xl font-bold">{`Vídeos selecionados para download (${selected.length})`}</h2>

        <div
          onClick={handleExcludeAll}
          className="inline-flex items-center gap-2 text-white text-xl font-bold hover:text-redytb hover:underline underline-offset-4 transition-all duration-200 cursor-pointer select-none"
        >
          Remover tudo
          <CicrcleXIcon size={18} color="currentColor" />
        </div>
        <button
          onClick={() => handleDownloadAll(selected)}
          className="flex items-center gap-1 text-white text-lg font-bold hover:text-redytb hover:underline underline-offset-4 transition-all duration-200 cursor-pointer select-none"
        >
          Baixar Todos
          <ArrowBigDownDasIcon size={18} color="currentColor" />
        </button>
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

          <div className="ml-auto flex items-center gap-2">
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
        </div>
      ))}
    </div>
  );
};

export default SelectedCard;
