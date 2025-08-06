import { app, shell, BrowserWindow, globalShortcut } from "electron";
import { join } from "path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import * as path from "path";
//import * as fs from "fs";
import * as dotenv from "dotenv";
import { registerControlButtons, registerSearchHandler } from "./ipcHandler";
const envPath = path.join(process.cwd(), ".env");
dotenv.config({ path: envPath });

//const assetsDir = path.join(__dirname, '../renderer/src/assets')
//const icoFile = fs.readdirSync(assetsDir).find((file) => file.endsWith('.ico'))
//const iconPath = icoFile ? path.join(assetsDir, icoFile) : undefined

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: "Ctrl+AI",
    //  icon: iconPath,
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

app.setName("YTB Music Downloader");
