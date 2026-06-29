# QA & Testing Progress Plan (Phase 10 Update)

This document outlines the systematic, comprehensive testing strategy for Smart Expense Tracker v2. It has been updated to include the newly implemented authentication flow and E2E testing framework.

## Status Legend
- ⬜ [PENDING]: Test has not been executed yet.
- ⏳ [IN PROGRESS]: Test is currently being executed or debugged.
- 🛑 [FAILED]: Test failed; bug report required.
- ✅ [PASSED]: Test passed successfully.

---

## 1. Authentication & Security (E2E & API)
- ✅ **Test 1.1: Registration Flow**
  - *Action:* Register a new user with valid credentials via UI.
  - *Expected:* Successful creation in DB, immediate redirect to `/login`.
- ✅ **Test 1.2: Login & JWT Issuance**
  - *Action:* Login with correct credentials.
  - *Expected:* Receive JWT, redirect to `/dashboard`, `AuthContext` stores user state.
- ⬜ **Test 1.3: Route Guard Protection**
  - *Action:* Attempt to navigate to `/dashboard` or `/budgets` while logged out.
  - *Expected:* Immediate redirect to `/login`.
- ✅ **Test 1.4: Invalid Credentials Handling**
  - *Action:* Attempt login with wrong password.
  - *Expected:* Error banner displayed; no navigation occurs.

---

## 2. Core Functional Testing (Transactions CRUD)
- ✅ **Test 2.1: Transaction Creation**
  - *Action:* Submit a valid Income/Expense transaction.
  - *Expected:* Saves to DB linked to `user_id`, UI list updates instantly.
- ⬜ **Test 2.2: User Data Isolation**
  - *Action:* Log in as User A, create transaction. Log in as User B.
  - *Expected:* User B cannot see User A's transactions.
- ⬜ **Test 2.3: Transaction Update (PUT)**
  - *Action:* Edit transaction amount and category.
  - *Expected:* Database updates successfully; dashboard charts reflect new totals.
- ⬜ **Test 2.4: Transaction Deletion (DELETE)**
  - *Action:* Delete a transaction.
  - *Expected:* Removed from UI and DB.

---

## 3. Financial Tools (Budgets & Goals)
- ⬜ **Test 3.1: Budget Tracking**
  - *Action:* Create a budget limit for a category. Add expenses in that category.
  - *Expected:* Budget progress bar updates automatically reflecting the `spent_amount`.
- ⬜ **Test 3.2: Goals Management**
  - *Action:* Create a financial goal.
  - *Expected:* Goal appears in the list with correctly calculated remaining amount.

---

## 4. Frontend UI/UX & Responsive Design (Stitch Aesthetics)
- ⬜ **Test 4.1: Theme Persistence**
  - *Action:* Toggle Dark/Light mode, then refresh the page.
  - *Expected:* Theme choice persists.
- ⬜ **Test 4.2: Mobile Responsiveness**
  - *Action:* Resize browser to <600px width.
  - *Expected:* Sidebar hides, BottomNavBar appears, grid adjusts to single column.
- ⬜ **Test 4.3: Chart Re-rendering**
  - *Action:* Add extreme/zero values to transactions.
  - *Expected:* Recharts visualizations adjust gracefully without breaking layout.

---

## 5. DevOps & Automation Pipeline
- ✅ **Test 5.1: Playwright Framework Initialization**
  - *Action:* Configure `@playwright/test` and run `sanity.spec.js`.
  - *Expected:* Tests execute against localhost successfully.
- ⬜ **Test 5.2: CI Pipeline E2E Execution**
  - *Action:* Push to GitHub `main` branch.
  - *Expected:* GitHub Actions runs ESLint, Vite build, and Playwright tests successfully.
- ⬜ **Test 5.3: Docker Compose Services**
  - *Action:* Run `docker-compose up --build`.
  - *Expected:* MySQL, Backend (Node), and Frontend (Nginx) containers start perfectly with correct network links.

---

*Note: All Phase 10 automated test executions will be tracked against these criteria.*
