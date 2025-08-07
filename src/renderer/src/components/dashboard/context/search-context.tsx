import React, { createContext, useState, ReactNode, useContext } from "react";
import { VideoItem } from "../../../../../types/videoItem";

type SearchContextType = {
  results: VideoItem[];
  setResults: React.Dispatch<React.SetStateAction<VideoItem[]>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<VideoItem[]>([]);
  return (
    <SearchContext.Provider value={{ results, setResults }}>{children}</SearchContext.Provider>
  );
};
