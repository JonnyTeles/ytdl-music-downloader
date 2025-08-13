import { parentPort } from "worker_threads";
import { Downloader } from "ytdl-mp3";

let downloadPath: string;

const downloader = new Downloader({
  getTags: true,
  verifyTags: false,
  silentMode: true,
  outputDir: "",
});

parentPort?.on("message", async (msg) => {
  if (msg.type === "init") {
    downloadPath = msg.path;
    downloader.outputDir = downloadPath;
    return;
  }

  const link = msg;
  try {
    await downloader.downloadSong(link);
    parentPort?.postMessage({ status: "done", link });
  } catch (err: any) {
    parentPort?.postMessage({ status: "error", error: err.message, link });
  }
});
