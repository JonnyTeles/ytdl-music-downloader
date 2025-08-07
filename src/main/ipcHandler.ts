import { BrowserWindow, ipcMain } from "electron";
import youtubesearchapi from "youtube-search-api";
import { apiSearchType } from '../types/apiSearchType';
import { extractPlaylistId } from "./utils";

export function registerControlButtons() {
  ipcMain.handle("window-minimize", (event) => {
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
    if (type === 'name') {
      return await youtubesearchapi.GetListByKeyword(query, false, 500, [{ type: "video" }]);
    } else if (type === 'playlist') {
      const playlistId = extractPlaylistId(query);
      return await youtubesearchapi.GetPlaylistData(playlistId, 500);
    } else {
      throw new Error(`Invalid search type: ${type}`);
    }
  });

}
