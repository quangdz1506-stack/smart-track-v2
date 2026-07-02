# Smart Expense Tracker v2 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

A modern, full-stack personal finance application designed to help users seamlessly track their income and expenses, manage monthly budgets, and achieve long-term financial goals. Built with a focus on clean architecture, beautiful glassmorphism UI, robust state management, and full End-to-End (E2E) testing.

---

## 🌟 Key Features

*   **Secure Authentication:** Full JWT-based authentication with bcrypt password hashing for multi-user isolation.
*   **Comprehensive Dashboard:** Real-time calculation of Total Income, Total Expenses, and Net Balance with Recharts visualization.
*   **Smart Budgets:** Set monthly limits per category. The system automatically calculates your `spent_amount` from your transactions and warns you with dynamic progress bars if you overspend.
*   **Financial Goals:** Create savings goals with deadlines and incrementally add funds to track your progress visually.
*   **Full CRUD Capabilities:** Seamlessly Add, View, Edit, and Delete financial transactions.
*   **User Preferences & Settings:** Persistent Light/Dark mode toggling and a Global Currency Selector (USD/EUR/VND).
*   **Danger Zone:** Safely wipe all your user data with one click (protected by confirmation dialogs and backend cascade deletions).
*   **End-to-End Tested:** Critical user flows (Authentication & Transaction CRUD) are fully covered by automated Playwright E2E tests.

## 🛠️ Technology Stack

**Frontend Layer:**
*   **React 18** (Functional Components, Custom Hooks, Context API)
*   **React Router DOM** (Client-side routing)
*   **Vite** (Next-generation lightning-fast frontend tooling)
*   **Recharts** (Declarative charting library)
*   **Pure CSS3** (Glassmorphism design, CSS Variables, Flexbox, and Grid)

**Backend Layer:**
*   **Node.js & Express.js** (Non-blocking I/O REST API)
*   **MySQL2** (Relational database with optimized Data Definition and Foreign Keys)
*   **JSON Web Tokens (JWT) & bcrypt** (Security and Authentication)
*   **CORS & Dotenv** (Security and environment configuration)

**Testing Layer:**
*   **Playwright** (Automated UI/DOM End-to-End Testing Framework)

---

## ⚙️ Architecture & Data Flow

The application follows a classic multi-tier architecture:
1.  **Presentation Tier (React):** Handles routing, local state, global contexts (`AuthContext`, `ThemeContext`, `CurrencyContext`), and dynamic rendering. Interacts with the backend via a centralized HTTP abstraction (`services/api.js`) that automatically injects `Bearer` tokens.
2.  **Logic Tier (Express):** Protects routes with middleware, validates payload integrity, and structures SQL commands.
3.  **Data Tier (MySQL):** A relational database storing `users`, `transactions`, `budgets`, and `goals` with foreign key constraints ensuring data integrity.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites
*   [Node.js](https://nodejs.org/en/) (v16 or higher)
*   [MySQL](https://www.mysql.com/) (or a local stack like Laragon / XAMPP)

### 1. Database Setup
1. Open your MySQL client or CLI.
2. Create a new database named `smart_expense_tracker`.
3. Run the provided `backend/config/schema.sql` file to generate all necessary tables.

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
echo "JWT_SECRET=your_super_secret_key" >> .env

# Start the Node.js server
npm start
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

### 4. Running E2E Tests
```bash
cd frontend
npx playwright test
```

---

## 📡 API Reference

The backend exposes a clean, authenticated REST API:

### Authentication
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user & get token
* `DELETE /api/auth/reset` - (Protected) Reset all user data

### Transactions
* `GET /api/transactions` - Fetch all user transactions
* `POST /api/transactions` - Create a transaction
* `PUT /api/transactions/:id` - Update transaction
* `DELETE /api/transactions/:id` - Delete transaction

### Budgets
* `GET /api/budgets` - Fetch all budgets (with dynamic spent amounts via SQL JOIN)
* `POST /api/budgets` - Create a budget limit
* `DELETE /api/budgets/:id` - Delete budget

### Goals
* `GET /api/goals` - Fetch all savings goals
* `POST /api/goals` - Create a goal
* `PUT /api/goals/:id/add-funds` - Incrementally add funds to a goal
* `DELETE /api/goals/:id` - Delete goal

---
*This project was developed to showcase full-stack engineering, strict context adherence, modern UI/UX design, and E2E testing automation.*