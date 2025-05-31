import { useState, useCallback, useContext } from "react";
import { Search } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const { theme, themes } = useContext(ThemeContext);

  const handleSearch = useCallback(() => {
    if (query.trim() !== "") {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }, [query]);

  const iconStyle = {
    strokeWidth: 2.5, // Bolder icon
    color: themes[theme]?.button,
  };

  return (
    <div className="flex items-center p-3 w-full justify-start transition-colors duration-500 hover:scale-105"> 
      <div className="relative w-full max-w-xl">
        {/* Search Icon */}
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          style={{ color: themes[theme].button }}
        >
          <Search size={27} style={{...iconStyle}}/>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type here..."
          aria-label="Search"
          className="w-full p-5 pl-12 pr-22 border-none rounded-full shadow-md focus:outline-none focus:ring-2"
          style={{
           backgroundColor: "rgba(255, 255, 255, 0.5)", color: themes[theme].text 
            
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          role="button"
          aria-label="Search"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-full hover:opacity-90"
          style={{
            backgroundColor: themes[theme].button,
            color: "#fff",
            border: "none",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
