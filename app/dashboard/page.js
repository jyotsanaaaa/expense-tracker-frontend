"use client";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [convertedTotal, setConvertedTotal] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      convertTotal();
    }
  }, [currency, expenses]);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  const convertTotal = async () => {
  try {
    const res = await api.get(
      `convert/?from=INR&to=${currency}&amount=${totalAmount}`
    );

    const convertedValue = res.data.rates?.[currency];

    setConvertedTotal(convertedValue);
  } catch (error) {
    console.error(error);
  }
};

  const categoryData = {};

  expenses.forEach((expense) => {
    if (categoryData[expense.category]) {
      categoryData[expense.category] += parseFloat(expense.amount);
    } else {
      categoryData[expense.category] = parseFloat(expense.amount);
    }
  });

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
  <div>
    <Navbar />
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Total Spent (INR): ₹{totalAmount.toFixed(2)}</h2>

      <h3>Convert Total</h3>

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="AUD">AUD</option>
      </select>

      {convertedTotal && (
        <h3>
          Converted Total: {convertedTotal.toFixed(2)} {currency}
        </h3>
      )}

      <h3>Category Breakdown</h3>

      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  </div>  
  );
}