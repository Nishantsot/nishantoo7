import React, { useState } from "react";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner"; 
import { searchBooks } from "./Bookapi";
import ExportPdfButton from "./ExportPdfButton";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState(
    JSON.parse(localStorage.getItem("recentBooks")) || []
  );
  const [loading, setLoading] = useState(false); 
  // Search books from API
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true); // show spinner
    try {
      const res = await searchBooks(query);
      setBooks(res.data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false); // hide spinner
    }
  };

  // Add book to recently viewed
  const addToRecentlyViewed = (book) => {
    const filtered = recentBooks.filter((b) => b.id !== book.id);
    const updated = [book, ...filtered].slice(0, 5);
    setRecentBooks(updated);
    localStorage.setItem("recentBooks", JSON.stringify(updated));
  };

  // Clear recently viewed
  const clearRecentlyViewed = () => {
    localStorage.removeItem("recentBooks");
    setRecentBooks([]);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">📚 BookNook</h1>

      <SearchBar
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
      />

     
      {loading && <LoadingSpinner />}

      
      <div className="row">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onViewDetails={() => addToRecentlyViewed(book)}
          />
        ))}
      </div>
      {books.length > 0 && (
  <ExportPdfButton books={books} title={`BookNook Results`} />
)}


  
      {recentBooks.length > 0 && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3> Recently Viewed</h3>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={clearRecentlyViewed}
            >
              Clear All
            </button>
          </div>
          <div className="row">
            {recentBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={() => addToRecentlyViewed(book)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
