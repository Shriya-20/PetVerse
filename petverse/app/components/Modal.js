import Loading from "./Loading";
// Component for creating pop ups in the page

export default function Modal({ isOpen, onClose, isLoading, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-dark1 dark:bg-mid2 dark:bg-opacity-60 bg-opacity-50 z-50">
        {/* Modal Content */}
        <div className="bg-light1 dark:bg-dark2 p-3 mx-3 rounded-lg shadow-lg max-w-lg w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full w-7 h-7 text-textDark dark:text-textLight hover:text-textDarker  dark:hover:text-textLighter  hover:bg-slate-200 dark:hover:bg-mid3 text-xl z-50"
          >
            x
          </button>
          {children}
        </div>
      </div>
      <Loading isLoading={isLoading} />
    </>
  );
}
