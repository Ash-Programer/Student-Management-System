# Student-Management-System

# Student Management System

A full-stack **Student Management System** built using **React.js**, **Node.js**, **Express.js**, and **PostgreSQL**.

The application supports:
- Complete CRUD Operations
- Pagination
- Search Functionality
- Responsive UI Design
- RESTful APIs

---

# Tech Stack

## Frontend
- React.js
- Bootstrap 5
- Axios
- Vite

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

---

# Features

## Backend Features
- Create Student
- Get All Students
- Get Single Student
- Update Student
- Delete Student
- Pagination Support
- Search Functionality
- Proper Error Handling
- RESTful APIs
- PostgreSQL Database Integration
- Environment Variable Configuration using dotenv

## Frontend Features
- Responsive UI
- Student Listing Table
- Add Student Modal
- Edit Student Modal
- Delete Student
- Pagination
- Search with Debouncing
- Dynamic Entries Limit
- API Integration using Axios

---

# Project Structure

```bash
StudentManagementSystem/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── studentControllers.js
│   │
│   ├── routes/
│   │   └── studentsRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   └── App.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
└── README.md

-----------------------------------------------------------------
API Endpoints
| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/createStudent` | Create Student     |
| GET    | `/api/allStudents`   | Get All Students   |
| GET    | `/api/student/:id`   | Get Single Student |
| PUT    | `/api/student/:id`   | Update Student     |
| DELETE | `/api/student/:id`   | Delete Student     |

Error Handling

Implemented:

Try-Catch blocks
Proper HTTP Status Codes
Validation checks
Database error handling

Key Concepts Implemented
REST APIs
CRUD Operations
Express Routing
PostgreSQL Queries
Axios API Integration
React Hooks
State Management
Pagination Logic
Search Debouncing
Modal Handling
Responsive Design

Future Improvements
JWT Authentication
Role Based Access
Sorting Feature
Advanced Filtering
Docker Deployment
Cloud Hosting

Author
Yash Galpelli
Full Stack Developer
React.js | Node.js | PostgreSQL
