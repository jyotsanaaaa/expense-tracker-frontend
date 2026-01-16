# Expense Tracker – Frontend

## Live Links

Frontend: https://expense-tracker-frontend-jyotsanas-projects-9c35b39a.vercel.app  
Dashboard: https://expense-tracker-frontend-jyotsanas-projects-9c35b39a.vercel.app/dashboard  
Backend API: https://expense-tracker-backend-thhy.onrender.com/api/expenses/  

---

## Project Overview

This is the frontend of the Expense Tracker application built using Next.js (React).  
It allows users to perform complete CRUD operations and view reports via a dashboard.

---

## Tech Stack

- Next.js (React)
- Axios
- Recharts
- Vercel (Deployment)

---

## Pages

| Page | Path |
|------|------|
| Home | / |
| Dashboard | /dashboard |

---

## Features

- Full CRUD from UI
- Dashboard with charts
- Currency conversion (third-party API)
- Connected to Django REST API
- Fully deployed

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://expense-tracker-backend-thhy.onrender.com
```

---

## How to Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Open:
http://localhost:3000

---

## How to Test (Step-by-Step)

### CRUD Flow

1. Open the frontend  
2. Fill the expense form  
3. Click Add Expense  
4. Click Edit  
5. Update the data  
6. Click Delete  

---

### Dashboard

Path:
```
/dashboard
```

URL:
https://expense-tracker-frontend-jyotsanas-projects-9c35b39a.vercel.app/dashboard

Features:
- Pie chart
- Category-wise breakdown
- Total spent

---

### Third-Party API Feature

Feature: Currency Conversion  
Location: Dashboard page  

Change the currency dropdown to:
- USD
- EUR
- GBP

The converted value updates using a third-party API.

---

## Deployment

Frontend is deployed on **Vercel**.

Steps:
1. GitHub connected to Vercel
2. Auto build on push
3. Environment variables configured
4. Backend API connected

---

## Backend Repo

https://github.com/jyotsanaaaa/expense-tracker-backend

---

## Author

Jyotsana Priyadarsini
