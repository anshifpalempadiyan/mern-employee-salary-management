<H1 align ="center" >MERN EMPLOYEE SALARY MANAGEMENT<br/>{ SiPeKa - Construction Edition }</h1>
<h5  align ="center"> 
SiPeKa (Employee Payroll System) is a comprehensive HRMS customized for the construction industry. This version is optimized for site managers and HR teams managing a blue-collar workforce, featuring real-time overtime tracking, Indian-standard formatting, and mobile-responsive data management.</h5>
<br/>

## 📋 Table of Contents
  * [Assignment Overview](#assignment-overview)
  * [Key Assignment Features](#key-assignment-features)
  * [Ticket Blitz (Support Fixes)](#ticket-blitz-support-fixes)
  * [Configuration and Setup](#configuration-and-setup)
  * [Technologies Used](#technologies-used)
  * [AI Tools & Rationale](#ai-tools--rationale)
  * [Technical Problem Solving](#technical-problem-solving)
  * [License](#license)

---

## 🏗 Assignment Overview
This project was completed as part of a React Developer hiring assignment. The objective was to fork an existing MERN-stack HRMS and implement construction-specific features and rapid-response bug fixes.

**HRMS Choice:** I chose the [berthutapea/mern-employee-salary-management](https://github.com/berthutapea/mern-employee-salary-management) repository.
**Reason:** Its clean MVC structure and existing payroll-focused architecture made it the perfect base to implement complex overtime validation and construction-specific designations (Mason, Electrician, etc.).

---

## 🚀 Key Assignment Features

### Part 1: Overtime Entry & Approval
Developed a full-stack Overtime Logging system for site managers to record daily worker hours.
- **Frontend Validations:**
  - Mandatory fields with error handling.
  - Daily cap enforcement (1-6 hours).
  - Date constraints (No future dates; no entries older than 7 days).
  - Reason character minimum (10+ characters).
- **Backend (API) Validations:**
  - Duplicate entry prevention (same worker + same date).
  - Worker existence verification.
  - **Monthly Cap Enforcement:** Logic to reject entries that push a worker's total monthly overtime beyond 60 hours.

---

## 🎫 Ticket Blitz (Support Fixes)

Each ticket was addressed with atomic commits to demonstrate rapid response ability:

* **TICKET LF-101 (Date Format):** Standardized all payslip and report dates to the Indian standard **DD/MM/YYYY**.
* **TICKET LF-102 (Negative Salary):** Implemented frontend and backend validation to prevent negative values in salary and amount fields.
* **TICKET LF-103 (Designation Field):** Added a 'Designation' dropdown to employee profiles with specific values: *Mason, Electrician, Plumber, Supervisor, Helper*.
* **TICKET LF-104 (CSV Export):** Integrated a **Download CSV** button on the Employee List page. The export is context-aware, exporting the currently filtered/searched list.
* **TICKET LF-105 (Mobile Layout):** Optimized the employee table for mobile devices using horizontal scrolling (`min-width` strategy) and `whitespace-nowrap` to ensure data readability on-site.

---

## ⚙️ Configuration and Setup

### 1. Prerequisites
- **Node.js** (v14+)
- **MySQL** (Server version 8.0+)
- **Ubuntu/Linux** (Recommended)

### 2. Database Setup
1. Create a MySQL database: `employee_salary_db`.
2. The schema is managed via **Sequelize**. On first run, the system will sync the tables.
3. **Admin User Setup:** Run the following in your MySQL terminal to create the initial admin:

```sql
INSERT INTO data_pegawai (
    id, id_pegawai, nik, nama_pegawai, username, password, 
    jenis_kelamin, jabatan, designation, tanggal_masuk, 
    status, photo, url, hak_akses, createdAt, updatedAt
) VALUES (
    UUID(), UUID(), '12345678', 'Admin Developer', 'Admin', 
    '$argon2id$v=19$m=65536,t=3,p=4$FN29fCp/QdYchKyuwacvKA$WayJbaatxnTv1JjBY3+KnOuWhKou0dht2KY7rpFbiY4', 
    'laki-laki', 'Admin', 'Supervisor', '2026-04-29', 
    'karyawan tetap', 'default.png', 'http://localhost:5000/images/default.png', 
    'admin', NOW(), NOW()
);

Installation
Backend:

Bash

$ cd Backend
$ npm install
$# Configure .env with your DB_USER, DB_PASSWORD, and SESS_SECRET$ npm start

Frontend:

Bash

$ cd Frontend
$ npm install
$ npm run dev

🛠 Technologies Used
Frontend
React JS & Vite

Redux Toolkit (State Management)

Tailwind CSS (UI & Responsiveness)

Axios (API Communication)

React-to-Print (PDF Reports)

SweetAlert2 (Validation Alerts)

Backend
Node.js & Express

MySQL with Sequelize ORM

Argon2 (Password Hashing)

Express-Session (Authentication)

Cors & Dotenv

🤖 AI Tools & Rationale
I utilized Gemini 3 Flash and ChatGPT to complete this assignment within the 48-hour window.

Gemini: Used as a primary collaborator for debugging complex Sequelize model de-syncs, implementing the 60-hour monthly overtime logic, and drafting responsive CSS strategies for the mobile table.

ChatGPT: Used for generating boilerplate code for the CSV mapping and refining documentation for professional clarity.

🧠 Technical Problem Solving
The "Primary Key" Crisis: During the implementation of LF-103, I encountered a critical database sync issue where a primary key swap de-synchronized existing sessions. I successfully performed a "silent recovery," reverting the model to the legacy id structure while maintaining the new designation feature data. This demonstrated my ability to read unfamiliar code and perform live-patch fixes under pressure.

📄 License
MIT License
Copyright (c) 2026 Anshif Palempadiyan