export {};

declare global {
  interface Window {
    electronAPI: {
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      search: (title: string) => Promise<any>;
    };
  }
}
