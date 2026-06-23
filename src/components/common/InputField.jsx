
// Reusable Input Field Component
export function InputField({ type = "text", placeholder, value, onChange, icon: Icon }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-11' : 'p-4'} pr-4 py-3.5 bg-[#F5F6F8] text-gray-700 text-sm rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition placeholder-gray-400`}
        required
      />
    </div>
  );
}

// Reusable Textarea Field Component
export function TextAreaField({ placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-36 p-4 bg-[#F5F6F8] text-gray-700 text-sm rounded-2xl resize-none border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition placeholder-gray-400"
      required
    />
  );
}