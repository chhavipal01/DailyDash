import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Trash2, BookMarked } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const Bookmark = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [bmTitle, setBmTitle] = useState("");
  const [bmLink, setBmLink] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (savedBookmarks) setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (e) => {
    e.preventDefault();
    if (!bmTitle || !bmLink) return;
    setBookmarks([...bookmarks, { id: uuidv4(), bmTitle, bmLink }]);
    setBmTitle("");
    setBmLink("");
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((bm) => bm.id !== id));
  };

  return (
    <>
      {/* Button */}
      <div className="fixed top-5 right-20 z-50 transition-transform transform hover:scale-120">
        <button
          className="p-2 rounded-lg transition hover:bg-opacity-80 flex items-center justify-center w-10 h-10"
          style={{ backgroundColor: themes[theme].button, color: themes[theme].text }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <BookMarked size={28} strokeWidth={2.75} color="#ffffff" />
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-lg p-4 z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}
      >
        <h2 className="text-2xl font-bold mb-4">Bookmarks</h2>

        {/* Form */}
        <form onSubmit={addBookmark} className="space-y-4">
          <div>
            <label htmlFor="bmTitle" className="block text-sm font-medium">Title</label>
            <input
              id="bmTitle"
              type="text"
              value={bmTitle}
              onChange={(e) => setBmTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div>
            <label htmlFor="bmLink" className="block text-sm font-medium">URL</label>
            <input
              id="bmLink"
              type="url"
              value={bmLink}
              onChange={(e) => setBmLink(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white hover:opacity-80"
            style={{ backgroundColor: themes[theme].button }}
          >
            Add Bookmark
          </button>
        </form>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <>
            <h3 className="mt-6 text-lg font-semibold">Recently Added</h3>
            <ul className="mt-2 space-y-2">
              {bookmarks.map((bookmark) => (
                <li
                  key={bookmark.id}
                  className="p-2 rounded-md flex justify-between items-center"
                  style={{ backgroundColor: themes[theme].button, color: themes[theme].text }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${bookmark.bmLink}`}
                    alt="Favicon"
                    onError={(e) => (e.target.src = "/assets/default-favicon.png")}
                    className="w-5 h-5 bg-white p-0 mr-2 rounded-full"
                  />
                  <a
                    href={bookmark.bmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate w-5/6"
                  >
                    {bookmark.bmTitle}
                  </a>
                  <button onClick={() => deleteBookmark(bookmark.id)} className="hover:opacity-80">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Bookmark;
