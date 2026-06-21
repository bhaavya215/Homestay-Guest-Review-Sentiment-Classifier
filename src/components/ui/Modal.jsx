/ @param {{isOpen: boolean, onClose: function, title: string, children: any}} props */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">{title}</h2>
        <div className="mb-6 dark:text-gray-300">{children}</div>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};