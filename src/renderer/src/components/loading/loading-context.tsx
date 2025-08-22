import React, { createContext, ReactNode, useContext, useState } from "react";
import LoadingOverlay from "./loading-overlay";

interface Progress {
  done: number;
  total: number;
}

interface LoadingContextProps {
  isLoading: boolean;
  message: string;
  progress?: Progress;
  setLoading: (loading: boolean, message?: string, progress?: Progress) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState<Progress | undefined>(undefined);

  const setLoading = (loading: boolean, newMessage?: string, newProgress?: Progress) => {
    setIsLoading(loading);
    if (newMessage) setMessage(newMessage);
    setProgress(newProgress);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, message, progress, setLoading }}>
      {children}
      {isLoading && <LoadingOverlay message={message} progress={progress} />}
    </LoadingContext.Provider>
  );
};
