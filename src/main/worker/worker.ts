import { parentPort } from 'worker_threads';
import { Downloader } from 'ytdl-mp3';

export const downloader = new Downloader({
    getTags: true,
    verifyTags: false,
});

parentPort?.on('message', async (link) => {
    try {
        await downloader.downloadSong(link);
        parentPort?.postMessage({ status: 'done', link });
    } catch (err: any) {
        parentPort?.postMessage({ status: 'error', error: err.message, link });
    }
});
