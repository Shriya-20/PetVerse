import Image from "next/image";
import defaultImage from "@/public/default_item.png";

const SlideImage = ({
  src,
  alt,
  opacity,
  width,
  name,
  profileImage,
  description,
}) => (
  <div
    className="flex-shrink-0  border border-gray-200 rounded-lg shadow-lg bg-white"
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
        <span className="ml-3 font-semibold text-gray-800">{name}</span>
      </div>
      <button className="text-gray-500 hover:text-gray-700">•••</button>
    </div>

    {/* Main Image */}
    <div className="w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={500}
        className="w-full h-64 object-cover rounded-lg"
        unoptimized
      />
    </div>

    {/* Footer */}
    <div className="px-4 py-3">
      {/* Action Icons */}
      <div className="flex space-x-4 mb-2">
        <button className="text-gray-500 hover:text-red-500">❤️</button>
        <button className="text-gray-500 hover:text-gray-700">📤</button>
      </div>
      {/* Description */}
      <div className="text-sm text-gray-700">
        <strong>{name}</strong> {description}
      </div>
    </div>
  </div>
);

export default SlideImage;
