import { app } from "electron";
import Store from "electron-store";
export const store = new Store();

export function extractPlaylistId(url: string): string {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : url;
}

export const initDownloadPath = () => {
  let path = store.get("downloadPath") as string | undefined;

  if (!path) {
    path = app.getPath("downloads");
    store.set("downloadPath", path);
    console.log("Download path inicializado:", path);
  }
};

export const getFolderPath = () => {
  const path = store.get("downloadPath") as string | undefined;
  return path;
};
