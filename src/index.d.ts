import { apiSearchType } from './types/apiSearchType';
export { };

declare global {
  interface Window {
    electronAPI: {
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      search: (apiSearchType: apiSearchType) => Promise<any>;
      download: (link: string[]) => Promise<any>;
    };
  }
}
