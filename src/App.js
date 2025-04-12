import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';

function App() {
  // State to store all expenses
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Gym Material', description: 'Monthly Gym & Lunch', category: 'bills', amount: 100, date: '2024-04-05' },
    { id: 2, name: 'VISA Finance', description: 'payment finance', category: 'utilities', amount: 2000, date: '2024-04-05' },
    { id: 3, name: 'Buy shoes', description: 'Add to my shoe collection', category: 'personal', amount: 5000, date: '2024-04-05' }
  ]);
  
  // State for deleted expenses (for undo functionality)
  const [deletedExpenses, setDeletedExpenses] = useState([]);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for sort configuration
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handler to add new expense
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  // Handler to delete expense
  const handleDeleteExpense = (id) => {
    const deletedExpense = expenses.find(expense => expense.id === id);
    setDeletedExpenses([...deletedExpenses, deletedExpense]);
    setExpenses(expenses.filter(expense => expense.id !== id));
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
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort expenses if sort config is set
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="App">
      <div className="app-header">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Track your expenses with ease</p>
      </div>
      <div className="container">
        <div className="left-panel">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="right-panel">
          <SearchBar onSearch={handleSearch} />
          <ExpenseTable 
            expenses={sortedExpenses}
            onDelete={handleDeleteExpense}
            onUndo={handleUndoDelete}
            canUndo={deletedExpenses.length > 0}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
