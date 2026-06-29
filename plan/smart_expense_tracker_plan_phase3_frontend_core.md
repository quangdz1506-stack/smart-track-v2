# PHASE 3: FRONTEND COMPONENT DEVELOPMENT

## Objective
Develop structural UI elements in isolation with clean state tracking, mock data references, and rigorous styling integration.

---

## Detailed Micro-Tasks

### [Task 3.1] Global Theme Provider Context
- **Action:**
  - Create `/src/context/ThemeContext.jsx`.
  - Manage a single piece of string state (`theme = 'light' | 'dark'`).
  - Expose a `toggleTheme` function that updates state and modifies the document root attribute (`document.documentElement.setAttribute('data-theme', theme)`).
- **Verification:** Wrap the application tree, click a temporary layout button, and verify background colors toggle dynamically.
- **Progress Tracking:** Mark Task 3.1 as ✅ in `progress.md`.

### [Task 3.2] Overview Dashboard Component
- **Action:**
  - Create `/src/components/DashboardSummary.jsx`.
  - Component accepts structural props or data inputs representing `totalIncome`, `totalExpenses`, and calculated `balance`.
  - Design three clean metric containers utilizing semantic indicators (e.g., green accents for income, red for expenses).
- **Verification:** Feed static mock numbers via props and verify proper decimal alignment and UI scaling.
- **Progress Tracking:** Mark Task 3.2 as ✅ in `progress.md`.

### [Task 3.3] Transaction Input Form Component
- **Action:**
  - Create `/src/components/TransactionForm.jsx`.
  - Implement controlled inputs for: Amount (number input), Type (dropdown/radio), Category (dropdown or text list), Date (date input), and Description.
  - Add simple UI constraint checking (e.g., prevent submitting if form values are empty).
- **Verification:** Submit form with text entries, capture the values in an `onSubmit` mock function handler, and print them to the console log.
- **Progress Tracking:** Mark Task 3.3 as ✅ in `progress.md`.

### [Task 3.4] Transaction History List & Filters Component
- **Action:**
  - Create `/src/components/TransactionList.jsx`.
  - Component renders an array of items into clean rows. Each item must show category, date, absolute amount, and a small visual delete option.
  - Add a top filtering row: A dropdown menu to filter by Category or Type.
- **Verification:** Map a static array of 5 entries to the list component, use the filter dropdown, and check if elements sort/hide correctly.
- **Progress Tracking:** Mark Task 3.4 as ✅ in `progress.md`.
