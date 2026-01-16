"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#111",
      color: "white"
    }}>
      <h2>Expense Tracker</h2>
      <div>
        <Link href="/" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}