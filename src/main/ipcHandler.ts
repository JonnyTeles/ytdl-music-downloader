import { BrowserWindow, dialog, ipcMain } from "electron";
import youtubesearchapi from "youtube-search-api";
import { apiSearchType } from "../types/apiSearchType";
import { extractPlaylistId, getFolderPath, getOpenFolder, openFolder, store } from "./utils";
import { downloadInWorker } from "./worker/downloadManager";
const pLimit = require('p-limit');

export function registerControlButtons() {
  ipcMain.handle("window-minimize", async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.minimize();
  });

  ipcMain.handle("window-maximize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    }
  });

  ipcMain.handle("window-close", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.close();
  });
}

export function registerSearchHandler() {
  ipcMain.handle("search", async (_event, payload: apiSearchType) => {
    const { query, type } = payload;
    if (type === "name") {
      return await youtubesearchapi.GetListByKeyword(query, false, 500, [{ type: "video" }]);
    } else if (type === "playlist") {
      const playlistId = extractPlaylistId(query);
      return await youtubesearchapi.GetPlaylistData(playlistId, 500);
    } else {
      throw new Error(`Invalid search type: ${type}`);
    }
  });
}

export function downloadHandler(mainWindow: BrowserWindow) {
  ipcMain.handle("download", async (_event, links: string[]) => {
    const limit = pLimit(5);

    const tasks = links.map(link =>
      limit(async () => {
        try {
          await downloadInWorker(link);
          //  mainWindow.webContents.send("download-progress", { link });
        } catch (err: any) {
          if (
            err.message.includes("Call to iTunes API did not return any results") ||
            err.message.includes("Output file already exists")
          ) return;
          console.error(err);
          throw new Error("Falha ao baixar músicas.");
        } finally {
          mainWindow.webContents.send("download-progress", { link });
        }
      })
    );

    await Promise.all(tasks);
    openFolder();

    return { success: true };
  });
}

export function handleGetFolderPath() {
  ipcMain.handle("get-folder-path", async (_event) => {
    return getFolderPath();
  });
}

export function handleSelectFolder(mainWindow: BrowserWindow) {
  ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: "Selecione a pasta",
      properties: ["openDirectory"]
    });
    let path = getFolderPath();
    if (result.canceled) return path;
    if (result.filePaths[0]) {
      store.set("downloadPath", result.filePaths[0]);
      return result.filePaths[0];
    }
    return path;
  });
}

export function handleGetOpenFolder() {
  ipcMain.handle("get-open-folder", async (_event) => {
    return getOpenFolder();
  });
}

export function handleOpenFolder() {
  ipcMain.handle("set-open-folder", (_event, open: boolean) => {
    return store.set('openFolder', open);
  });
}