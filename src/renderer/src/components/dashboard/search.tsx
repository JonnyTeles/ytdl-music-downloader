import { useState } from "react";
import { useSearch } from "./search-context";
import { Search as SearchIcon, X } from "lucide-react";
import Loading from "./loading";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const { setResults } = useSearch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const search = async () => {
    if (!query.trim()) return; //TODO: ADICIONAR SNACKBAR
    try {
      setLoading(true);
      setProgress(0);

      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 100);

      const startTime = Date.now();
      const data = await window.electronAPI.search(query);

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1000 - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => {
          if (data?.items) {
            setResults(data.items);
          }
          setLoading(false);
          setProgress(0);
        }, 300);
      }, delay);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setProgress(0);
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
    <div className="w-full p-2">
      <div className="flex items-center relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            placeholder="Nome ou Link do vídeo" //TODO: MELHORAR NOME DISSO
            className="w-full bg-primary text-white px-4 py-2 rounded-l-full border border-gray-600 focus:outline-none focus:border-redytb pr-10"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={18} />
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
