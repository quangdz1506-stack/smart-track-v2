# SPECIFICATION: SMART EXPENSE TRACKER

## 1. Project Overview
A web-based Smart Expense Tracker built over a strict 7-day timeline. The core focus is demonstrating advanced Context Engineering to guide an AI assistant ("Antigravity") to produce high-quality, production-ready, and consistent code without unnecessary human intervention.

### Tech Stack
- **Frontend:** React (Vite, Functional Components, Hooks)
- **Database:** Laragon (MySQL Instance)
- **Backend:** Node.js with Express (or lightweight PHP/Laravel as determined by environment)
- **Styling:** CSS Variables / Tailwind CSS with explicit Light/Dark design tokens

---

## 2. Antigravity Execution Rules (Crucial)

### Rule 1: Context Awareness
- Before performing ANY task or generating any code, you MUST read this `spec.md` and the current state in `progress.md`.
- Never bypass or ignore project architectural decisions.

### Rule 2: Complete Autonomy & Continuity
- Work continuously through tasks. Do not halt to ask "Should I proceed?" or "Is this okay?". 
- Move from one micro-task to the next if the previous one is fully completed and verified.

### Rule 3: Strict Blocker Reporting (Zero Speculation)
- If you encounter a critical bug, dependency conflict, or ambiguous instruction, **STOP IMMEDIATELY**.
- Do not make assumptions or invent workarounds without validation.
- Output a structured "BLOCKER REPORT" containing:
  1. Current file and line number.
  2. The exact error message or logical contradiction.
  3. Two distinct proposed technical solutions with pros/cons.
- Wait for user decision before modifying any code.

### Rule 4: Micro-Task Isolation
- Never write more than one component or one database table script at a time.
- Test or visually verify each small chunk before moving forward.
- Keep file edits granular to prevent context window saturation or code truncation.

### Rule 5: Status Synchronization
- Every time a task or sub-task changes state, you must update `progress.md` with the corresponding icon.
- Do not batch updates at the end of the day; update incrementally.

### Rule 6: English-Only Communication & Code (Strict)
- Absolutely NO Vietnamese or any other language is allowed. 
- Every file, database column name, variable, code comment, commit message, documentation entry, AND all chat conversations/responses with the user MUST be written strictly in English.

### Rule 7: Blind Verification (CLI Testing)
- Since you (Antigravity) cannot see the UI or database directly, after providing code, you MUST provide the exact CLI commands or testing steps required to verify the code works.
- Do not mark a task as ✅ `[DONE]` in `progress.md` until the user pastes the terminal output or confirms visual success.

### Rule 8: Read Before Write
- Never blindly overwrite existing files. 
- You MUST explicitly request to read the current contents of a file before proposing modifications to prevent unintentional code deletion or context loss.

### Rule 9: Version Control Checkpoints
- Upon the successful completion (✅) of any significant task or sub-task, automatically generate and output a `git commit` command with a concise, professional message in English (e.g., `git commit -m "feat: implement theme toggle context"`).
- This ensures an immediate rollback point if the next task introduces critical failures.
