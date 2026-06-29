# Phase 5: Feature Enhancements

## Goal
Implement additional features to improve user experience, including theme persistence using LocalStorage and data visualization using Recharts.

## Scope
1. **LocalStorage Theme Persistence**
   - Save the selected theme (Light/Dark mode) in the browser's `localStorage`.
   - On application load, retrieve the theme from `localStorage` to maintain the user's preference.

2. **Recharts Dashboard Data Visualization**
   - Integrate `recharts` library into the frontend.
   - Upgrade the `DashboardSummary` component to include visual charts (e.g., Pie chart for Income vs. Expenses, Bar chart for detailed breakdown).

3. **Edit Transaction Feature (Full Stack)**
   - Update the API to support `PUT` / `PATCH` requests for transactions.
   - Update `TransactionForm` and `TransactionList` on the frontend to allow editing existing transactions.

## Acceptance Criteria
- [x] Theme preference persists across page reloads.
- [x] Dashboard visually displays data using Recharts components.
- [x] Users can successfully edit and update an existing transaction, with changes reflecting in both the UI and database.

## Execution Steps
- Update `ThemeContext.jsx` to utilize `localStorage`.
- Install `recharts` and update `DashboardSummary.jsx`.
- Implement API update logic in `backend/src/controllers/transactionController.js`.
- Update `TransactionForm.jsx` and `App.jsx` state management for editing mode.

## Verification
- Test by changing the theme and refreshing the browser.
- Verify Recharts render accurately with mock/live data.
- Execute full CRUD cycle for transactions, specifically the `UPDATE` flow.
