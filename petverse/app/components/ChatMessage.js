import Image from "next/image";

export default function ChatMessage({
  id,
  sender,
  content,
  timestamp,
  type,
  url,
  link,
}) {
  switch (type) {
    case "video":
      return (
        <div>
          <video
            controls
            className="rounded-md border border-light2 w-full max-w-xs"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support videos.
          </video>
        </div>
      );
    case "image":
      return (
        <div>
          <Image
            src={url}
            alt="Message image"
            height={150}
            width={150}
            className="rounded-md border border-light2 w-full max-w-sm"
          />
        </div>
      );
    case "link":
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          {content}
        </a>
      );
    default:
      return (
        <p className="w-full overflow-wrap break-words text-left">{content}</p>
      );
  }
}
