import { contextBridge, ipcRenderer } from "electron";
import { apiSearchType } from "../types/apiSearchType";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.invoke("window-minimize"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  close: () => ipcRenderer.invoke("window-close"),
  search: (apiSearchType: apiSearchType) => ipcRenderer.invoke("search", apiSearchType),
  download: (link: string[]) => ipcRenderer.invoke("download", link),
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  getFolderPath: () => ipcRenderer.invoke("get-folder-path")
});
