import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SearchBar from "./components/SearchBar";
import logo from './assets/logo.svg';

/**
 * Main App Component
 * 
 * This is the root component of the Expense Tracker application.
 * It manages the global state and coordinates between child components.
 * 
 * Features:
 * - Expense management (add, delete, undo delete)
 * - Search and filter functionality
 * - Sorting capabilities
 * - Theme switching (dark/light mode)
 */
function App() {
  // Initial expense data with sample entries
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Gym Material",
      description: "Monthly Gym & Lunch",
      category: "bills",
      amount: 100,
      date: "2024-04-05",
    },
    {
      id: 2,
      name: "VISA Finance",
      description: "payment finance",
      category: "utilities",
      amount: 2000,
      date: "2024-04-05",
    },
    {
      id: 3,
      name: "Buy shoes",
      description: "Add to my shoe collection",
      category: "personal",
      amount: 5000,
      date: "2024-04-05",
    },
  ]);

  // Store deleted expenses for undo functionality
  const [deletedExpenses, setDeletedExpenses] = useState([]);

  // Search term for filtering expenses
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting configuration (key: column to sort by, direction: ascending/descending)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Theme state for dark/light mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Adds a new expense to the list
   * @param {Object} newExpense - The expense object to add
   */
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  /**
   * Deletes an expense and stores it for potential undo
   * @param {number} id - The ID of the expense to delete
   */
  const handleDeleteExpense = (id) => {
    const deletedExpense = expenses.find((expense) => expense.id === id);
    setDeletedExpenses([...deletedExpenses, deletedExpense]);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  /**
   * Restores the most recently deleted expense
   */
  const handleUndoDelete = () => {
    if (deletedExpenses.length > 0) {
      const lastDeleted = deletedExpenses[deletedExpenses.length - 1];
      setExpenses([...expenses, lastDeleted]);
      setDeletedExpenses(deletedExpenses.slice(0, -1));
    }
  };

  /**
   * Updates search term for filtering expenses
   * @param {string} term - The search term to filter by
   */
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  /**
   * Handles sorting when a column header is clicked
   * @param {string} key - The column key to sort by
   */
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  /**
   * Toggles between dark and light theme
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Filter expenses based on search term (name or description match)
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort expenses based on current sort configuration
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valueA = a[sortConfig.key].toString().toLowerCase();
    const valueB = b[sortConfig.key].toString().toLowerCase();

    if (valueA < valueB) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <img src={logo} className="app-logo" alt="Expense Tracker Logo" />
        <h1>Expense Tracker</h1>
      </header>
      {/* Theme toggle button */}
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-btn">
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Main content container */}
      <div className="container">
        {/* Left panel with expense form */}
        <div className="left-panel">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            isDarkMode={isDarkMode}
          />
        </div>
        {/* Right panel with search and expense table */}
        <div className="right-panel">
          <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
          <ExpenseTable
            expenses={sortedExpenses}
            onDelete={handleDeleteExpense}
            onUndo={handleUndoDelete}
            canUndo={deletedExpenses.length > 0}
            onSort={handleSort}
            sortConfig={sortConfig}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
