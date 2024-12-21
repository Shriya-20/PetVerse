import { ChevronLeft, ChevronRight } from "react-feather";

const NavigationButtons = ({ onPrev, onNext }) => (
  <div className="absolute inset-0 flex items-center justify-between p-4">
    <button
      onClick={onPrev}
      className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
    >
      <ChevronLeft size={40} />
    </button>
    <button
      onClick={onNext}
      className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
    >
      <ChevronRight size={40} />
    </button>
  </div>
);

export default NavigationButtons;