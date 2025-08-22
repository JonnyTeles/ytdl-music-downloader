import { app, shell } from "electron";
import Store from "electron-store";
export const store = new Store();
import { appendFile, mkdirSync } from "fs";
import { join } from "path";

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
    store.set("openFolder", false);
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
  return shell.openExternal(folderPath);
};

const logsDir = join(app.getPath("userData"), "logs");
mkdirSync(logsDir, { recursive: true });

const logFilePath = join(logsDir, "error.log");

export function logError(err: any): void {
  const timestamp = new Date().toISOString();
  let message = "";

  if (err instanceof Error) {
    message = err.stack || err.message;
  } else {
    message = String(err);
  }

  const logMessage = `[${timestamp}] ${message}\n`;

  appendFile(logFilePath, logMessage, (writeErr) => {
    if (writeErr) {
      console.error("Erro ao escrever no log:", writeErr);
    }
  });
}
