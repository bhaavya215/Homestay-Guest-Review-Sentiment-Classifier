/ @param {{message: string, type: string, isVisible: boolean}} props */
export const Toast = ({ message, type = "info", isVisible }) => {
  if (!isVisible) return null;
  
  const bgColors = { 
    success: "bg-green-500", 
    error: "bg-red-500", 
    info: "bg-blue-500" 
  };
  
  return (
    <div className={`fixed bottom-4 right-4 text-white px-4 py-3 rounded shadow-lg ${bgColors[type]} z-50`}>
      {message}
    </div>
  );
};