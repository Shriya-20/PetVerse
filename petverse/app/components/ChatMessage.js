import Image from "next/image";
import Link from "next/link";

export default function ChatMessage({ content, type }) {
  switch (type) {
    case "video":
      return (
        <div>
          <video
            controls
            className="rounded-md border border-light2 w-full max-w-xs"
          >
            <source src={content} type="video/mp4" />
            Your browser does not support videos.
          </video>
        </div>
      );
    case "image":
      return (
        <div>
          <Image
            src={content}
            alt="Message image"
            height={150}
            width={150}
            className="rounded-md border border-light2 w-full max-w-sm"
          />
        </div>
      );
    default: {
      const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

      const parts = content.split(urlRegex);
      return (
        <p className="w-full overflow-wrap break-words text-left p-3">
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
