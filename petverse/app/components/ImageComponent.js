import Image from "next/image";

const SlideImage = ({ src, alt, opacity, width }) => (
  <div className="flex-shrink-0" style={{ width: `${width}%` }}>
    <Image
      src={src}
      alt={alt}
      width={400}
      height={250}
      className={`w-full h-full object-cover rounded-lg opacity-${opacity}`}
      priority
    />
  </div>
);

export default SlideImage;