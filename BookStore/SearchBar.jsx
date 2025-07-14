import React from "react";

function SearchBar({ query, onChange, onSearch }) {
  return (
    <div className="d-flex mb-4 gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Search books by title, author, or keyword..."
        value={query}
        onChange={onChange}
      />
      <button className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
