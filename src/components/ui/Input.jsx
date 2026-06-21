/ @param {{type: string, placeholder: string, value: string, onChange: function, className: string}} props */
export const Input = ({ type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      className={`border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
    />
  );
};