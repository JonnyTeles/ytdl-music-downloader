import { app, shell } from "electron";
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
  }
};

export const initOpenFolder = () => {
  let openFolder = store.get("openFolder") as boolean | undefined;

  if (!openFolder) {
    store.set("downloadPath", false);
  }
};


export const getFolderPath = () => {
  const path = store.get("downloadPath") as string | undefined;
  return path;
};

export const getOpenFolder = () => {
  const open = store.get("openFolder") as boolean | undefined;
  return open;
};

export const openFolder = async () => {
  const folderPath = getFolderPath();
  if (!folderPath) return;

  const shouldOpen = getOpenFolder();
  if (!shouldOpen) return;

  await shell.openPath(folderPath);
};