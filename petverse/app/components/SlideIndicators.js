const SlideIndicators = ({ slides, currentIndex }) => (
  <div className="absolute bottom-4 right-0 left-0">
    <div className="flex items-center justify-center gap-2">
      {slides.map((_, i) => (
        <div
          key={i}
          className={`transition-all w-3 h-3 bg-black dark:bg-white rounded-full ${
            currentIndex === i ? "p-2" : "bg-opacity-50"
          }`}
        />
      ))}
    </div>
  </div>
);

export default SlideIndicators;
