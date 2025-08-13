import path from "path";
import { Worker } from "worker_threads";
import { store } from "../utils";

export function downloadInWorker(link: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "worker/worker.js"));

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
