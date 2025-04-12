import React from "react";

function ExpenseTable({
  expenses,
  onDelete,
  onUndo,
  canUndo,
  onSort,
  sortConfig,
}) {
  // Helper function to render sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="expense-table-container">
      <div className="table-header">
        <h2>Your Expenses</h2>
        {canUndo && (
          <button onClick={onUndo} className="undo-btn">
            <span className="undo-icon">↩</span> Undo Delete
          </button>
        )}
      </div>
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => onSort("name")}>
                Name{getSortIndicator("name")}
              </th>
              <th onClick={() => onSort("description")}>
                Description{getSortIndicator("description")}
              </th>
              <th onClick={() => onSort("category")}>
                Category{getSortIndicator("category")}
              </th>
              <th onClick={() => onSort("amount")}>
                Amount{getSortIndicator("amount")}
              </th>
              <th onClick={() => onSort("date")}>
                Date{getSortIndicator("date")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                <td>
                  <span className={`category-badge ${expense.category}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="amount">{formatCurrency(expense.amount)}</td>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="6" className="no-expenses">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
