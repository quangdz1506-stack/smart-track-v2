# PHASE 1: FOUNDATION & DATABASE ENVIRONMENT

## Objective
Establish a clean, scalable architectural baseline for both frontend and database layers.

---

## Detailed Micro-Tasks

### [Task 1.1] Initialize React Frontend
- **Action:** Run Vite to bootstrap a React application (`npm create vite@latest frontend -- --template react`).
- **Verification:** Ensure the dev server starts on `localhost:5173` without errors.
- **Progress Tracking:** Mark Task 1.1 as ✅ in `progress.md`.

### [Task 1.2] Boilerplate Cleanup
- **Action:** - Delete default assets (`react.svg`, `vite.svg` from public/src if unnecessary).
  - Clear out `App.css` and reset `index.css`.
  - Create directory layout under `/src`: `/components`, `/context`, `/hooks`, `/services`, `/utils`.
- **Verification:** `App.js` or `App.jsx` renders a clean `<h1>Hello World</h1>` with zero console warnings.
- **Progress Tracking:** Mark Task 1.2 as ✅ in `progress.md`.

### [Task 1.3] Global Styling & Theme Design Tokens
- **Action:**
  - Define root CSS variables for colors, background, and text in `index.css`.
  - Ensure dual-mapping for themes using a data attribute or class selector (e.g., `:root[data-theme="light"]` vs `:root[data-theme="dark"]`).
  - Colors must utilize professional, muted, desaturated palettes.
- **Verification:** Manually switch the attribute in HTML elements to prove background and text colors invert perfectly.
- **Progress Tracking:** Mark Task 1.3 as ✅ in `progress.md`.

### [Task 1.4] Laragon MySQL Database Initialization
- **Action:**
  - Start Laragon service and create a new database named `smart_expense_tracker`.
  - Write a raw SQL script `schema.sql` to create the `transactions` table.
  - Table Schema constraints:
    - `id`: INT AUTO_INCREMENT PRIMARY KEY
    - `amount`: DECIMAL(10, 2) NOT NULL
    - `type`: ENUM('income', 'expense') NOT NULL
    - `category`: VARCHAR(50) NOT NULL
    - `date`: DATE NOT NULL
    - `description`: TEXT NULL
    - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- **Verification:** Run `DESCRIBE transactions;` inside Laragon's database terminal to verify precise column structures.
- **Progress Tracking:** Mark Task 1.4 as ✅ in `progress.md`.
