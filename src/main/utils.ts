export function extractPlaylistId(url: string): string {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : url;
}

