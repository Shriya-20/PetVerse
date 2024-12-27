import clsx from "clsx";
import { useEffect } from "react";

export default function Popup({ type, message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "border-t-4 rounded-b px-4 py-3 shadow-md duration-300 ease-in-out",
        {
          "bg-teal-100 border-teal-500 text-teal-900": type === "success",
          "bg-red-400 border-red-500 text-red-900": type === "error",
        }
      )}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={clsx("fill-current h-6 w-6 mr-4", {
              "text-teal-500": type === "success",
              "text-red-500": type === "error",
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{type}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
