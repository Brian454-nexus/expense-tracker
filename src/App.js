import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SearchBar from "./components/SearchBar";

function App() {
  // State to store all expenses
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

  // State for deleted expenses (for undo functionality)
  const [deletedExpenses, setDeletedExpenses] = useState([]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for sort configuration
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // State for theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handler to add new expense
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  // Handler to delete expense
  const handleDeleteExpense = (id) => {
    const deletedExpense = expenses.find((expense) => expense.id === id);
    setDeletedExpenses([...deletedExpenses, deletedExpense]);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Handler to undo delete
  const handleUndoDelete = () => {
    if (deletedExpenses.length > 0) {
      const lastDeleted = deletedExpenses[deletedExpenses.length - 1];
      setExpenses([...expenses, lastDeleted]);
      setDeletedExpenses(deletedExpenses.slice(0, -1));
    }
  };

  // Handler for search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handler for sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort expenses if sort config is set
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
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-btn">
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div className="app-header">
        <div className="header-content">
          <h1>
            <span className="gradient-text">Expense</span>
            <span className="gradient-text-2">Tracker</span>
          </h1>
          <p className="subtitle">Manage your finances with ease</p>
          <div className="header-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="left-panel">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            isDarkMode={isDarkMode}
          />
        </div>
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
