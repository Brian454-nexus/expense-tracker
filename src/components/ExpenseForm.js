import React, { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  // Initial form state
  const initialFormState = {
    name: "",
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  };

  // Form state
  const [formData, setFormData] = useState(initialFormState);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.amount || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    // Convert amount to number
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    // Add expense and reset form
    onAddExpense(expenseData);
    setFormData(initialFormState);
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="form-group">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

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

        <div className="form-group">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            min="0"
            step="0.01"
            required
          />
        </div>

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
