import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  size = 18,
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={size}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        style={{ width: size, height: size }}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ paddingLeft: `${size + 24}px` }}
        className="w-full bg-gray-100 rounded-full py-3 pr-4 outline-none text-sm md:text-base text-gray-800 transition-all focus:bg-gray-200/70 placeholder-gray-400"
      />
    </div>
  );
}
