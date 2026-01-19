import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";

interface MediaViewerProps {
  mediaType: "video" | "image";
  mediaUrl: string;
  title: string;
}

const MediaViewer = ({ mediaType, mediaUrl, title }: MediaViewerProps) => {
  if (mediaType === "video") {
    const { embedUrl, isYoutube } = convertToEmbedUrl(mediaUrl);

    if (isYoutube) {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#000"
          }}
        >
          <iframe
            src={embedUrl}
            title={title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#000"
        }}
      >
        <video
          src={mediaUrl}
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#f3f4f6"
      }}
    >
      <SafeImage
        src={mediaUrl}
        alt={title}
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
};

export default MediaViewer;
