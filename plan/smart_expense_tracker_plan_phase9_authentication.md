# PHASE 9: USER AUTHENTICATION & SECURITY

## Objective
Transition the application from a single-user local state to a secure, multi-tenant environment using JWT (JSON Web Token) authentication.

---

## Detailed Micro-Tasks

### [Task 9.1] Update Database Schema for Users
- **Action:**
  - Write and execute a SQL script to create a `users` table (`id`, `username`, `email`, `password_hash`, `created_at`).
  - Alter the `transactions` (and any other relevant tables like budgets/goals) to include a `user_id` foreign key.
- **Verification:** Provide the raw SQL scripts and confirm table structures via CLI (`DESCRIBE users;`).
- **Progress Tracking:** Mark Task 9.1 as ✅ in `progress.md`.

### [Task 9.2] Backend API Auth Endpoints (Register & Login)
- **Action:**
  - Install `bcryptjs` and `jsonwebtoken`.
  - Implement `POST /api/auth/register`: Hash the password and store the new user.
  - Implement `POST /api/auth/login`: Verify password and return a signed JWT token.
  - Create an authentication middleware to protect all existing `/api/transactions` and `/api/budgets` endpoints by verifying the JWT token.
- **Verification:** Use Postman/curl to register a user, login to receive a token, and attempt to fetch transactions with and without the token.
- **Progress Tracking:** Mark Task 9.2 as ✅ in `progress.md`.

### [Task 9.3] Frontend Auth Context & Route Guards
- **Action:**
  - Create `/src/context/AuthContext.jsx` to manage user login state and store the JWT securely.
  - Create a `ProtectedRoute` component wrapper for React Router to redirect unauthenticated users to the Login page.
- **Verification:** Manually navigate to `/dashboard` without logging in and verify redirection to `/login`.
- **Progress Tracking:** Mark Task 9.3 as ✅ in `progress.md`.

### [Task 9.4] Build Login and Registration UI Components
- **Action:**
  - Create `/src/pages/Login.jsx` and `/src/pages/Register.jsx` with full form validation and error state handling (e.g., "Invalid credentials").
  - Connect forms to the AuthContext to trigger backend API calls.
- **Verification:** Perform a full registration and login flow via the UI and verify that the dashboard loads successfully post-login.
- **Progress Tracking:** Mark Task 9.4 as ✅ in `progress.md`.