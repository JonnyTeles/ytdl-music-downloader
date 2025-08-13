"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const ytdl_mp3_1 = require("ytdl-mp3");
let downloadPath;
const downloader = new ytdl_mp3_1.Downloader({
    getTags: true,
    verifyTags: false,
    silentMode: true,
    outputDir: "",
});
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on("message", async (msg) => {
    if (msg.type === "init") {
        downloadPath = msg.path;
        downloader.outputDir = downloadPath;
        return;
    }
    const link = msg;
    try {
        await downloader.downloadSong(link);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: "done", link });
    }
    catch (err) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: "error", error: err.message, link });
    }
});
