import React from "react";

function SearchBar({ onSearch }) {
  // Handle search input changes
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expenses..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
