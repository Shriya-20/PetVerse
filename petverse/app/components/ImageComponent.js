import Image from "next/image";
import defaultImage from "@/public/default_user_profile_pic.jpeg";

function SlideImage({
  src,
  alt,
  opacity,
  width,
  name,
  profileImage,
  description,
  OnClickImage,
  type,
}) {
  const handleSendImage = () => {
    console.log("Image sent to main");
    OnClickImage(src);
  };

  return (
    <div
      className="flex-shrink-0  border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-dark2 z-[49]"
      style={{
        width: `${width}%`,
        opacity: `${opacity}%`,
        transform: `scale(${opacity / 100})`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Image
            src={profileImage ? profileImage : defaultImage}
            alt={`profile`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            unoptimized
          />
          <span className="ml-3 font-semibold text-gray-800 dark:text-textLight">
            {name}
          </span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">•••</button>
      </div>

      {/* Main Image */}
      <div className="w-full">
        {type === "image" && (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={500}
            className="w-full h-64 object-cover"
            unoptimized
            onClick={handleSendImage}
          />
        )}

        {/* {type === "video" && (
          <div
            className="relative w-full h-0 pb-[100%] overflow-hidden bg-light1"
            onClick={handleSendImage}
          >
            <video
              controls={true}
              autoPlay={true}
              preload="auto"
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={src} type="video/mp4" />
              Your browser does not support videos.
            </video>
          </div>
        )} */}
        {type === "video" && (
          <div className="flex items-center bg-black dark:bg-dark2 justify-center w-full h-full  top-0 left-0 ">
            <video
              controls={true}
              autoPlay={true}
              className="max-w-full max-h-full object-contain"
            >
              <source src={src} type="video/mp4" />
              Your browser does not support videos.
            </video>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3">
        {/* Action Icons */}
        <div className="flex space-x-4 mb-2 justify-between">
          <button className="text-gray-500 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>
        </div>
        {/* Description */}
        <div className="text-sm text-gray-700 dark:text-textLight">
          <strong>{name}</strong> {description}
        </div>
      </div>
    </div>
  );
}

export default SlideImage;
