import Image from "next/image";
import Link from "next/link";

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
    default: {
      const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

      const parts = content.split(urlRegex);
      return (
        <p className="w-full overflow-wrap break-words text-left">
          {parts.map((part, index) =>
            urlRegex.test(part) ? (
              <Link
                key={index}
                href={part}
                target="_blank"
                className="underline text-blue-500"
              >
                {part}
              </Link>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  }
}
