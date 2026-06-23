# 🌐 Solo Sphere Client

Solo Sphere Client is a modern job marketplace application where buyers can post jobs and freelancers can bid.  
It provides secure authentication, dynamic job management, bidding workflows, and advanced search with pagination.

---

## 🚀 Live Demo

[Solo Sphere Live](https://solo-sphere-87a94.web.app)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios, Custom Hooks
- **Backend:** Express.js, MongoDB, JWT Authentication
- **Authentication:** Firebase Authentication (Login, Register, JWT verification)
- **Deployment:** Firebase Hosting (Frontend), Vercel (Backend)
- **Packages Used:**
  - `axios` (with interceptors)
  - `jsonwebtoken`
  - `cookie-parser`
  - `cors`
  - `firebase`
  - `react-router-dom`

---

## ✨ Features

### 🔐 Authentication

- Firebase login/register
- JWT-based secure routes
- Logout functionality in navbar

### 📄 Job Management

- Add, update, delete jobs
- Show jobs by category
- Job card details by ID
- Buyer posted jobs table with update & delete

### 💼 Freelancer Dashboard

- Submit bids on jobs
- View freelancer bids
- Status updates for bid requests

### 📑 Bid Requests

- Buyer can view all bids received
- Update bid request status
- Show bidders’ data in dashboard
- Bids data saved to DB with job reference

### 🔍 Search & Sorting

- Search jobs dynamically with keyword
- Sort jobs by fields (e.g., size, category)
- Filter jobs by category

### 📄 Pagination

- Dynamic pagination buttons
- Next/Prev button handling
- Items per page selection

---

## 📂 Project Setup

### Install Dependencies

```bash
npm install
```

📅 Development Timeline
May 24, 2026 → Client-side setup with Firebase

May 26–31, 2026 → Authentication, product forms, private routes

June 1–6, 2026 → Buyer job CRUD operations, bids collection setup

June 7–10, 2026 → Bid requests, freelancer dashboard, JWT integration

June 23, 2026 → Search, sorting, filtering, dynamic pagination completed

🌐 Deployment
Frontend: Firebase Hosting → tech-job-portal-45406.web.app

Backend: Vercel → tech-job-portal-server.vercel.app

📌 Future Improvements
Role-based dashboards (Admin, Buyer, Freelancer)

Enhanced UI with TailwindCSS or Material UI

Real-time notifications for bids and job updates

Advanced search filters (salary range, skills, etc.)

👨‍💻 Author
Developed by Taanveer22  
GitHub: Taanveer22

---
