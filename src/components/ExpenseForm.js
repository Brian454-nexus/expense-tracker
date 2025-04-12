import React, { useState } from "react";

/**
 * ExpenseForm Component
 * 
 * Handles the creation of new expenses through a form interface.
 * Includes validation and proper formatting of data before submission.
 * 
 * @param {Object} props
 * @param {Function} props.onAddExpense - Callback function to add new expense
 * @param {boolean} props.isDarkMode - Current theme state
 */
function ExpenseForm({ onAddExpense }) {
  // Initial state for the form fields
  const initialFormState = {
    name: "",
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Sets today's date as default
  };

  // Form state management
  const [formData, setFormData] = useState(initialFormState);

  /**
   * Handles changes in form input fields
   * Updates the form state as user types
   * 
   * @param {Object} e - Event object from input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles form submission
   * Validates required fields and formats data before submission
   * 
   * @param {Object} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.amount || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    // Format the expense data
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount), // Convert amount to number
    };

    // Submit the expense and reset form
    onAddExpense(expenseData);
    setFormData(initialFormState);
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        {/* Expense Name Field */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Expense name"
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        {/* Category Selection */}
        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="bills">Bills</option>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {/* Amount Field */}
        <div className="form-group">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount (KSH)"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Date Field */}
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
