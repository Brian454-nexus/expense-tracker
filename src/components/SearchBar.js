import React from "react";

/**
 * SearchBar Component
 *
 * Provides real-time search functionality for filtering expenses.
 * Updates parent component as user types.
 *
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function for search term updates
 * @param {boolean} props.isDarkMode - Current theme state
 */
function SearchBar({ onSearch }) {
  /**
   * Handles search input changes
   * Passes search term to parent component for filtering
   *
   * @param {Object} e - Input change event
   */
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expenses by name or description..."
        onChange={handleChange}
        className="search-input"
        aria-label="Search expenses"
      />
    </div>
  );
}

export default SearchBar;
