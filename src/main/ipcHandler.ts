import { BrowserWindow, ipcMain } from "electron";
import youtubesearchapi from "youtube-search-api";

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
  ipcMain.handle("search", async (_event, title: string) => {
    const data = await youtubesearchapi.GetListByKeyword(title, false, 10, [{ type: "video" }]);
    return data;
  });
}
