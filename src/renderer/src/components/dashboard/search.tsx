import { useState } from "react";
import { useSearch } from "./context/search-context";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import Loading from "./loading";
import { useToast } from "../toast/toast-context";

const Search: React.FC = () => {
  //TODO: MOVER PRA UM HOOK
  const [query, setQuery] = useState("");
  const { setResults } = useSearch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();

  const search = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setProgress(0);

      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 100);

      const startTime = Date.now();
      const type =
        query.startsWith("http://") || query.startsWith("https://") ? "playlist" : "name";
      const data = await window.electronAPI.search({ query, type });

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1000 - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => {
          if (data?.items) setResults(data.items);
          if (!data?.items.length) {
            showToast({
              title: "Erro",
              message: "Nenhum vídeo encontrado",
              type: "error",
              closable: true,
            });
          }
          setLoading(false);
          setProgress(0);
        }, 300);
      }, delay);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setProgress(0);
      showToast({
        title: "Erro",
        message: "Ocorreu um erro ao pesquisar pelo vídeo",
        type: "error",
        closable: true,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="w-full p-2 -mt-10">
      <div className="flex items-center relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            placeholder="Pesquisar vídeo"
            className="w-full bg-primary text-white px-4 py-2 rounded-l-full border border-gray-600 focus:outline-none focus:border-redytb pr-10"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>
        <button
          className="bg-secondary border border-l-0 border-gray-600 px-5 py-2 rounded-r-full hover:bg-gray-700 transition"
          onClick={search}
        >
          <SearchIcon size={24} color="#fff" />
        </button>
      </div>
      {loading && <Loading progress={progress} />}
    </div>
  );
};

export default Search;
