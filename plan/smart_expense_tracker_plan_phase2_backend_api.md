# PHASE 2: BACKEND API & DATA LAYER

## Objective
Construct a robust, secure REST API to manage transactional data entries, directly connecting to the Laragon MySQL service.

---

## Detailed Micro-Tasks

### [Task 2.1] Backend Initialization & Environment
- **Action:**
  - Create a `/backend` directory parallel to `/frontend`.
  - Initialize project (`npm init -y`) and install `express`, `mysql2`, `dotenv`, and `cors`.
  - Configure `.env` file pointing to Laragon's MySQL configuration (`DB_HOST=localhost`, `DB_USER=root`, `DB_PASS=`, `DB_NAME=smart_expense_tracker`).
- **Verification:** Server loads successfully without crashing and reads `.env` entries safely.
- **Progress Tracking:** Mark Task 2.1 as ✅ in `progress.md`.

### [Task 2.2] Database Connection Pool Setup
- **Action:**
  - Create `/backend/config/db.js`.
  - Initialize a `mysql2.createPool` instance.
  - Add a connection test probe on startup that logs database connectivity success or queries failure.
- **Verification:** Node console outputs `Database connection successful` upon server startup.
- **Progress Tracking:** Mark Task 2.2 as ✅ in `progress.md`.

### [Task 2.3] API Endpoint: Create Transaction (POST)
- **Action:**
  - Map route `POST /api/transactions`.
  - Implement request body validation: Ensure `amount` is a positive number, `type` is exactly 'income' or 'expense', and `date` follows standard YYYY-MM-DD.
  - Execute parameterized SQL: `INSERT INTO transactions (amount, type, category, date, description) VALUES (?, ?, ?, ?, ?)`.
- **Verification:** Execute a sample request via Postman/Thunder Client and check for a `201 Created` payload with an inserted ID.
- **Progress Tracking:** Mark Task 2.3 as ✅ in `progress.md`.

### [Task 2.4] API Endpoint: Fetch Transactions (GET)
- **Action:**
  - Map route `GET /api/transactions`.
  - Allow query parameter filtering (`?category=Food` or `?type=expense`).
  - Build the SQL query dynamically based on present parameters using secure bindings to prevent injection.
  - Sort results descending by `date`.
- **Verification:** Target URL returns a clean JSON array containing the records previously seeded.
- **Progress Tracking:** Mark Task 2.4 as ✅ in `progress.md`.

### [Task 2.5] API Endpoint: Delete Transaction (DELETE)
- **Action:**
  - Map route `DELETE /api/transactions/:id`.
  - Extract route parameter, run validation to verify ID formatting.
  - Execute SQL query: `DELETE FROM transactions WHERE id = ?`. Check affected rows to confirm existence.
- **Verification:** Sending a DELETE request returns a `200 OK` or `204 No Content` status; a subsequent GET proves data removal.
- **Progress Tracking:** Mark Task 2.5 as ✅ in `progress.md`.
