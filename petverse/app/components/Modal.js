// Component for creating pop ups in the page

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="relative rounded-full w-7 text-gray-500 hover:text-gray-700 hover:bg-slate-200 -top-[135]  z-[52] left-[510] text-xl"
        >
          x
        </button>
        {/* Modal Content */}
        <div className="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
          {children}
        </div>
      </div>
    </>
  );
}
