"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    payment_method: "",
    notes: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        await api.put(`expenses/${editingId}/`, formData);
        alert("Expense updated!");
        setEditingId(null);
      } else {
        // CREATE
        await api.post("expenses/", formData);
        alert("Expense added!");
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        payment_method: "",
        notes: "",
      });

      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Error saving expense");
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      payment_method: expense.payment_method,
      notes: expense.notes,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await api.delete(`expenses/${id}/`);
      alert("Deleted!");
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Error deleting");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="payment_method"
          placeholder="Payment Method"
          value={formData.payment_method}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <hr />

      <h2>Expenses</h2>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id + expense.title}>
            {expense.title} - ₹{expense.amount}
            <br />
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}