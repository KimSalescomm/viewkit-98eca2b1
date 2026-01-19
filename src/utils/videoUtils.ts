export interface VideoInfo {
  embedUrl: string;
  isYoutube: boolean;
}

export const convertToEmbedUrl = (url: string): VideoInfo => {
  // YouTube URL patterns
  const youtubePatterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)(?:\?t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      const startTime = match[2];
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      if (startTime) {
        embedUrl += `?start=${startTime}`;
      }
      
      return { embedUrl, isYoutube: true };
    }
  }

  // Not a YouTube URL, return as-is
  return { embedUrl: url, isYoutube: false };
};
