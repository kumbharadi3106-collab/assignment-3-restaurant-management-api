# 🍽️ Restaurant Management API

A REST API built with **Node.js**, **Express**, and **MongoDB** for managing restaurants and their menus. Authentication is handled via **JSON Web Tokens (JWT)**, and passwords are securely hashed with **bcrypt**.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Restaurants](#restaurants)
  - [Menu Items](#menu-items)
- [Data Models](#data-models)
- [Middleware](#middleware)
- [License](#license)

---

## 🛠️ Tech Stack

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| Node.js      | Runtime environment      |
| Express 5    | Web framework            |
| MongoDB      | NoSQL database           |
| Mongoose     | MongoDB ODM              |
| JWT          | Token-based auth         |
| bcryptjs     | Password hashing         |
| dotenv       | Environment variables    |

---

## 📂 Project Structure

```
restaurant-api/
├── config/
│   └── db.js                  # MongoDB connection setup
├── middleware/
│   ├── authmiddleware.js      # JWT authentication guard
│   └── logger.js              # Request logging middleware
├── models/
│   ├── module.js              # Restaurant & MenuItem schemas
│   └── user.js                # User schema
├── router/
│   ├── authrouter.js          # Register & Login routes
│   └── restaurantRouter.js    # Restaurant CRUD & menu routes
├── server.js                  # App entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd restaurant-api

# Install dependencies
npm install

# Start the server
npm start
```

The server will start on **http://localhost:4000**.

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/restaurant-db
JWT_SECRET=your_jwt_secret_key
```

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `MONGO_URI`  | MongoDB connection string            |
| `JWT_SECRET` | Secret key used to sign JWT tokens   |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint    | Auth | Description              |
| ------ | ----------- | ---- | ------------------------ |
| POST   | `/register` | ❌   | Register a new user      |
| POST   | `/login`    | ❌   | Login & receive a token  |

#### Register

```http
POST /register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response** `201 Created`
```json
{ "message": "User registered successfully" }
```

#### Login

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response** `200 OK`
```json
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

---

### Restaurants

> 🔒 Routes marked with **Auth** require an `Authorization: Bearer <token>` header.

| Method | Endpoint           | Auth | Description                       |
| ------ | ------------------ | ---- | --------------------------------- |
| GET    | `/restaurants`     | ❌   | Get all restaurants               |
| GET    | `/restaurants/top` | ❌   | Get top 5 restaurants by rating   |
| GET    | `/restaurants/:id` | ❌   | Get a single restaurant by ID     |
| POST   | `/restaurants`     | 🔒   | Create a new restaurant           |
| PUT    | `/restaurants/:id` | 🔒   | Update a restaurant               |
| DELETE | `/restaurants/:id` | 🔒   | Delete a restaurant               |

#### Create Restaurant

```http
POST /restaurants
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Spice Garden",
  "city": "Mumbai",
  "address": "123 Main Street",
  "cuisine": "Indian",
  "rating": 4.5,
  "menu": [
    { "name": "Butter Chicken", "price": 350, "isAvailable": true },
    { "name": "Naan", "price": 50 }
  ]
}
```

---

### Menu Items

| Method | Endpoint                  | Auth | Description                         |
| ------ | ------------------------- | ---- | ----------------------------------- |
| GET    | `/restaurants/:id/menu`   | ❌   | Get all menu items for a restaurant |
| POST   | `/restaurants/:id/menu`   | 🔒   | Add a menu item to a restaurant     |

#### Add Menu Item

```http
POST /restaurants/:id/menu
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Paneer Tikka",
  "price": 250,
  "isAvailable": true
}
```

---

## 📦 Data Models

### User

| Field      | Type     | Required | Notes           |
| ---------- | -------- | -------- | --------------- |
| `username` | String   | ✅       | Trimmed         |
| `email`    | String   | ✅       | Unique, trimmed |
| `password` | String   | ✅       | Hashed (bcrypt) |

### Restaurant

| Field     | Type         | Required | Notes          |
| --------- | ------------ | -------- | -------------- |
| `name`    | String       | ✅       | Trimmed        |
| `city`    | String       | ✅       | Trimmed        |
| `address` | String       | ✅       | Trimmed        |
| `cuisine` | String       | ✅       | Trimmed        |
| `rating`  | Number       | ✅       | Range: 0 – 5   |
| `menu`    | [MenuItem]   | ❌       | Embedded array  |

### MenuItem (embedded)

| Field         | Type    | Required | Notes            |
| ------------- | ------- | -------- | ---------------- |
| `name`        | String  | ✅       | Trimmed          |
| `price`       | Number  | ✅       | Min: 0           |
| `isAvailable` | Boolean | ❌       | Default: `true`  |

> Both `User` and `Restaurant` schemas include automatic `createdAt` and `updatedAt` timestamps.

---

## ⚙️ Middleware

| Middleware       | File                          | Description                                              |
| ---------------- | ----------------------------- | -------------------------------------------------------- |
| **Logger**       | `middleware/logger.js`        | Logs every request with timestamp, HTTP method, and path |
| **Auth Guard**   | `middleware/authmiddleware.js` | Validates JWT from the `Authorization` header            |

---

## 📄 License

This project is licensed under the **ISC** License.
