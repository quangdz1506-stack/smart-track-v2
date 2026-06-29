# QA & Testing Progress Plan

This document outlines the systematic testing strategy for the Smart Expense Tracker v2 to ensure high reliability, security, and user experience.

## Status Legend
- ⬜ [PENDING]: Test has not been executed yet.
- ⏳ [IN PROGRESS]: Test is currently being executed or debugged.
- 🛑 [FAILED]: Test failed; bug report required.
- ✅ [PASSED]: Test passed successfully.

---

## 1. Frontend: UI/UX & State Testing
- ⬜ **Test 1.1: Theme Persistence**
  - *Action:* Toggle Dark/Light mode, then refresh the page.
  - *Expected:* The theme choice should persist seamlessly without flashing white.
- ⬜ **Test 1.2: Responsive Design**
  - *Action:* Resize the browser window to mobile width (<600px).
  - *Expected:* The Dashboard charts and Transaction form should stack vertically and remain readable.
- ⬜ **Test 1.3: Data Visualization (Recharts)**
  - *Action:* Add extreme values (e.g., $99,999,999) and zero values.
  - *Expected:* The Pie and Bar charts should not break layout and tooltips should format currency correctly.
- ⬜ **Test 1.4: Error Boundary Display**
  - *Action:* Disconnect the backend server and refresh the frontend.
  - *Expected:* The UI should display a clean, user-friendly error message ("Failed to connect to the server").

---

## 2. Full-Stack Functional Testing (CRUD)
- ⬜ **Test 2.1: Create Transaction (Validation)**
  - *Action:* Attempt to submit a transaction with an empty amount or empty category.
  - *Expected:* Frontend should block the submission and display a red validation error.
- ⬜ **Test 2.2: Create Transaction (Success)**
  - *Action:* Submit a valid Income and Expense transaction.
  - *Expected:* Both should appear immediately in the list, and the Dashboard totals must update accurately.
- ⬜ **Test 2.3: Edit Transaction (PUT)**
  - *Action:* Click the 'Edit' (✎) button on a transaction, change the amount, and submit.
  - *Expected:* The form should populate correctly, update the database, and refresh the UI list without a page reload.
- ⬜ **Test 2.4: Delete Transaction (DELETE)**
  - *Action:* Click the 'Delete' (✕) button on a transaction.
  - *Expected:* The transaction should be removed from the list and database, and Dashboard totals should recalculate.

---

## 3. Backend & Security Testing
- ⬜ **Test 3.1: SQL Injection Protection**
  - *Action:* Send a POST request with the category: `Food'; DROP TABLE transactions;--`.
  - *Expected:* The database should safely insert the literal string without executing the dropped table command.
- ⬜ **Test 3.2: API Payload Validation**
  - *Action:* Send a POST/PUT request with `{ amount: -50, type: "invalid" }` using Postman/Curl.
  - *Expected:* The backend should return a `400 Bad Request` with a descriptive error message.

---

## 4. DevOps & Deployment Testing
- ⬜ **Test 4.1: GitHub Actions CI**
  - *Action:* Push a new commit containing a deliberate ESLint error (e.g., unused variable).
  - *Expected:* The GitHub Action pipeline should fail and block the merge.
- ⬜ **Test 4.2: Docker Compose Orchestration**
  - *Action:* Run `docker-compose up --build` on a fresh machine.
  - *Expected:* MySQL, Backend, and Frontend containers should start successfully, and the database should automatically initialize the `transactions` schema.

---

*This document should be updated iteratively as testing progresses.*
