// Component for creating pop ups in the page

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* Modal Content */}
        <div className="bg-white p-3 mx-3 rounded-lg shadow-lg max-w-lg w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full w-7 h-7 text-gray-500 hover:text-gray-700 hover:bg-slate-200 text-xl"
          >
            x
          </button>
          {children}
        </div>
      </div>
    </>
  );
}