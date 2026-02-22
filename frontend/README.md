# NextCall CRM - Frontend (Prototype)

This folder contains a minimal React + Vite scaffold and a set of presentational components to kick off the UI implementation for NextCall CRM.

Quick start (PowerShell):

```powershell
cd frontend
npm install
npm run dev
```

What is included:
- `src/App.jsx` - layout + outlet
- `src/pages/*` - `Dashboard`, `CustomerList`, `CustomerDetail` (presentational)
- `src/components/*` - `Sidebar`, `TableRow`, `Badge` (reusable)
- `src/styles.css` - basic tokens and layout

Next recommended steps:
- Hook pages to the Express API endpoints for customers, notes, reminders.
- Replace chart placeholders with `recharts` or `chart.js` components.
- Add state management (React Query) and form components for notes/reminders.
- Add unit tests for critical components.
