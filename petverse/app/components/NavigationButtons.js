import { ChevronLeft, ChevronRight } from "react-feather";

const NavigationButtons = ({
  onPrev,
  onNext,
  ifPrev = true,
  ifNext = true,
}) => (
  <div className="absolute inset-0 flex items-center justify-between p-4">
    {ifPrev && (
      <button
        onClick={onPrev}
        className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
      >
        <ChevronLeft size={40} />
      </button>
    )}
    {!ifPrev && (
      <button className="p-2 rounded-full bg-white2 dark:bg-dark1"></button>
    )}
    {ifNext && (
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
      >
        <ChevronRight size={40} />
      </button>
    )}
    {!ifNext && (
      <button className="p-2 rounded-full bg-white2 dark:bg-dark1"></button>
    )}
  </div>
);

export default NavigationButtons;
