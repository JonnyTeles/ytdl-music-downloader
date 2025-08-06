import { useSearch } from "./search-context";

const SelectedCard: React.FC = () => {
  const { results } = useSearch();

  return (
    <div className="space-y-2">
      {results.map((video) => (
        <div
          key={video.id}
          className="flex items-center space-x-3 p-2 hover:cursor-pointer hover:border border-redytb"
        >
          <img
            src={video.thumbnail.thumbnails[0].url}
            alt={video.title}
            className="w-32 h-auto rounded"
          />
          <span className="text-white">{video.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SelectedCard;
