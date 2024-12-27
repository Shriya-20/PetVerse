export default function CardComponent({ image, caption, opacity, width }) {
    return (
      <div
        className={`flex flex-col justify-center items-center transition-opacity duration-300`}
        style={{
          opacity: `${opacity}%`,
          width: `${width}rem`,
        }}
      >
        <img
          src={image}
          alt={caption}
          className="rounded-lg shadow-md mb-2 w-full"
        />
        <p className="text-center text-gray-800 font-semibold">{caption}</p>
      </div>
    );
  }
  