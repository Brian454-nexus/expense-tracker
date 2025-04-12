import React from "react";

/**
 * ExpenseTable Component
 *
 * Displays expenses in a sortable table format with delete functionality.
 * Includes sorting indicators and category badges for better visualization.
 *
 * @param {Object} props
 * @param {Array} props.expenses - List of expenses to display
 * @param {Function} props.onDelete - Callback for deleting an expense
 * @param {Function} props.onUndo - Callback for undoing last delete
 * @param {boolean} props.canUndo - Whether there are expenses that can be restored
 * @param {Function} props.onSort - Callback for sorting expenses
 * @param {Object} props.sortConfig - Current sort configuration
 * @param {boolean} props.isDarkMode - Current theme state
 */
function ExpenseTable({
  expenses,
  onDelete,
  onUndo,
  canUndo,
  onSort,
  sortConfig,
}) {
  /**
   * Renders sort indicator (↑/↓) based on current sort configuration
   *
   * @param {string} key - Column key to check for sort status
   * @returns {string} Sort indicator arrow or empty string
   */
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  /**
   * Formats date string to localized date format
   *
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
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
      {/* Table Header with Undo Option */}
      <div className="table-header">
        <h2>Your Expenses</h2>
        {canUndo && (
          <button onClick={onUndo} className="undo-btn">
            <span className="undo-icon">↩</span> Undo Delete
          </button>
        )}
      </div>

      {/* Expense Table */}
      <div className="expense-table">
        <table>
          {/* Column Headers with Sort Functionality */}
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

          {/* Table Body with Expense Data */}
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                {/* Category with Color-coded Badge */}
                <td>
                  <span className={`category-badge ${expense.category}`}>
                    {expense.category}
                  </span>
                </td>
                {/* Formatted Amount in KSH */}
                <td className="amount">{formatCurrency(expense.amount)}</td>
                <td>{formatDate(expense.date)}</td>
                {/* Delete Action */}
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
            {/* Empty State Message */}
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
