import React, { createContext, ReactNode, useContext, useState } from "react";
import LoadingOverlay from "./loading-overlay";

interface LoadingContextProps {
  isLoading: boolean;
  message: string;
  setLoading: (loading: boolean, message?: string) => void;
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

  const setLoading = (loading: boolean, newMessage?: string) => {
    setIsLoading(loading);
    if (newMessage) setMessage(newMessage);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, message, setLoading }}>
      {children}
      {isLoading && <LoadingOverlay message={message} />}
    </LoadingContext.Provider>
  );
};
