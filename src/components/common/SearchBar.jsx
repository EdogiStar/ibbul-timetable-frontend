import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full md:w-96">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
}

export default SearchBar;