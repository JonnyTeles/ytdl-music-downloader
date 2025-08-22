import path from "path";
import { Worker } from "worker_threads";
import { store } from "../utils";
import { app } from "electron";

function getWorkerPath(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app.asar.unpacked', 'out', 'main', 'worker', 'worker.js');
  }
  return path.resolve(__dirname, 'worker', 'worker.js');
}

export function downloadInWorker(link: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const workerPath = getWorkerPath();
    const worker = new Worker(workerPath);

    worker.postMessage({ type: "init", path: store.get("downloadPath") });
    worker.postMessage(link);

    worker.on("message", (msg: { status: string; error?: string; link: string }) => {
      if (msg.status === "done") resolve(msg.link);
      else if (msg.status === "error") reject(new Error(msg.error));
    });

    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Worker parou com código ${code}`));
    });
  });
}
