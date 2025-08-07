import React, { createContext, useState, ReactNode, useContext } from "react";
import { VideoItem } from "../../../../../types/videoItem";

type SelectedContextType = {
  selected: VideoItem[];
  setSelected: React.Dispatch<React.SetStateAction<VideoItem[]>>;
};

const SelectedContext = createContext<SelectedContextType | undefined>(undefined);

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) throw new Error("useSelected must be used within a SelectedProvider");
  return context;
};

export const SelectedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<VideoItem[]>([]);
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};
