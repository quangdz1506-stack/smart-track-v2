# Smart Expense Tracker v2 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

A modern, full-stack personal finance application designed to help users seamlessly track their income and expenses, visualize financial habits, and maintain a healthy budget. Built with a focus on clean architecture, responsive UI, and robust state management.

---

## 🌟 Key Features

*   **Comprehensive Dashboard:** Real-time calculation of Total Income, Total Expenses, and Net Balance.
*   **Data Visualization:** Interactive Pie and Bar charts powered by **Recharts** to analyze spending versus earning.
*   **Full CRUD Capabilities:** Seamlessly Add, View, Edit, and Delete financial transactions.
*   **Persistent Theme Toggling:** A custom Light/Dark mode implementation that saves user preferences via `localStorage`.
*   **Robust Backend API:** RESTful architecture built with Node.js & Express, featuring strict input sanitization and parameterized MySQL queries to prevent SQL injection.
*   **Asynchronous UI State:** Smooth optimistic rendering with graceful error handling if the network connection drops.

## 🛠️ Technology Stack

**Frontend Layer:**
*   **React 18** (Functional Components & Custom Hooks)
*   **Vite** (Next-generation lightning-fast frontend tooling)
*   **Recharts** (Declarative charting library)
*   **Pure CSS3** (CSS Variables, Flexbox, and CSS Grid for responsive design)

**Backend Layer:**
*   **Node.js & Express.js** (Non-blocking I/O web server)
*   **MySQL2** (Promise-based MySQL driver leveraging Connection Pools for high concurrency)
*   **CORS & Dotenv** (Security and environment configuration)

---

## ⚙️ Architecture & Data Flow

The application follows a classic multi-tier architecture:
1.  **Presentation Tier (React):** Handles routing, local state (`useState`, `useEffect`), and dynamic rendering. Interacts with the backend via a centralized HTTP abstraction (`services/api.js`).
2.  **Logic Tier (Express):** Receives HTTP requests, validates payload integrity, and structures SQL commands.
3.  **Data Tier (MySQL):** A relational database storing transactions with optimized data types (`DECIMAL` for currency, `DATETIME` for auditing).

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites
*   [Node.js](https://nodejs.org/en/) (v16 or higher)
*   [MySQL](https://www.mysql.com/) (or a local stack like Laragon / XAMPP)

### 1. Database Setup
1. Open your MySQL client or CLI.
2. Create a new database named `smart_expense_tracker`.
3. Run the provided `schema.sql` file located in the root directory to generate the `transactions` table.

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file based on your local database credentials
echo "DB_HOST=localhost" > .env
echo "DB_USER=root" >> .env
echo "DB_PASSWORD=" >> .env
echo "DB_NAME=smart_expense_tracker" >> .env
echo "PORT=5000" >> .env

# Start the Node.js server
node index.js
```

### 3. Frontend Setup
Open a new terminal window:
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

---

## 📡 API Reference

The backend exposes a clean REST API running by default on port `5000`:

| Method   | Endpoint                  | Description                                      |
| :------- | :------------------------ | :----------------------------------------------- |
| `GET`    | `/api/transactions`       | Fetch all transactions (supports query filters). |
| `POST`   | `/api/transactions`       | Create a new transaction.                        |
| `PUT`    | `/api/transactions/:id`   | Update an existing transaction by ID.            |
| `DELETE` | `/api/transactions/:id`   | Delete a transaction by ID.                      |

---

## 🎯 Future Roadmap (CI/CD & DevOps)

*   [ ] Implement **JWT Authentication** to support multiple individual users.
*   [ ] Containerize the application using **Docker & Docker Compose**.
*   [ ] Automate testing and deployment using **GitHub Actions**.
*   [ ] Implement advanced filtering capabilities (by date range, category tags).

---
*This project was developed to showcase full-stack engineering, clean code principles, and an eye for modern UI/UX design.*