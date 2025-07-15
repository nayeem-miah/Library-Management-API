# 📚 Library Management API

A full-featured RESTful Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose** ORM. This API allows users to manage books and borrowing records with proper schema validation, filtering, and aggregation functionalities.

> 🔗 **Live API**: [https://library-management-api-topaz.vercel.app](https://library-management-api-topaz.vercel.app)  
> 🎥 **Video Explanation**: *Coming Soon*

---

## 🎯 Features

- Add, update, get, and delete books
- Borrow books with business logic (available copies check)
- Get summary of borrowed books via aggregation
- Schema-level validation using Mongoose
- Filtering and sorting with query parameters
- Global error handling (validation, 404s, server errors)
- Mongoose static

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (via Mongoose)
- Vercel for deployment

---

## 📦 API Endpoints

### 📚 Book Routes

| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| POST   | `/api/books`        | Create a new book             |
| GET    | `/api/books`        | Get all books (with filters)  |
| GET    | `/api/books/:id`    | Get book by ID                |
| PUT    | `/api/books/:id`    | Update a book                 |
| DELETE | `/api/books/:id`    | Delete a book                 |

### 📖 Borrow Routes

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/borrow`         | Borrow a book                        |
| GET    | `/api/borrow`         | Borrowed books summary (aggregation) |
| GET    | `/api/get-all-borrow` | Borrowed books summary (aggregation) |

---

## ⚙️ How to Run This Project Locally

```bash
# 1. Clone the repository
git clone https://github.com/nayeem-miah/Library-Management-API.git

# 2. Navigate to the project directory
cd library-management-api

# 3. Install dependencies
npm install

# 4. Create a .env file and add your MongoDB connection string
# Example .env
MONGODB_URI=mongodb://localhost:27017/library-management

# 5. Start the server (development)
npm run dev

# 6. For production build
npm run build
npm start
```



## 🌱 "From sleepless nights to deployed sites — every project brings me closer to my dream as a full-stack developer."

