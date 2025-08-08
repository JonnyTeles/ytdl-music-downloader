import { app, shell, BrowserWindow, globalShortcut } from "electron";
import { join } from "path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { downloadHandler, registerControlButtons, registerSearchHandler } from "./ipcHandler";
const envPath = path.join(process.cwd(), ".env");
dotenv.config({ path: envPath });
process.env.YTDL_NO_UPDATE = '1';

//TODO AJEITAR ICON
const assetsDir = path.join(__dirname, '../renderer/assets');
const icoFile = fs.readdirSync(assetsDir).find((file) => file.endsWith('.ico'));
const iconPath = icoFile ? path.join(assetsDir, icoFile) : undefined;
const downloadFolder = path.join(__dirname, 'Musics');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: "Youtub Music Downloader",
    icon: iconPath || undefined,
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  registerControlButtons();
  registerSearchHandler();
  downloadHandler();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
  }
});

app.setName("YTB Music Downloader");
