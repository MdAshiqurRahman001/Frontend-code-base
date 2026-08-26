# Project Development Guidelines

## Workspace Isolation & Active Context
- **Never touch or modify files in any other workspace/project** unless explicitly commanded by the user.
- **Strictly operate only in the active workspace/project** where the user is giving commands and editing files.
- Always verify the active workspace root path before creating, editing, or deleting files.

## Project Structure & Architecture Standards

Always adhere strictly to the following directory and component architecture:

### 1. App Router Pages (`src/app/**/page.tsx`)
- **Keep extremely brief (5–10 lines max)**.
- **Never** write page layout JSX, forms, component states, or API queries/logic directly inside `page.tsx`.
- **Sole Purpose**: Import and render the corresponding module component from `@/components/module/...`.

```tsx
import FeatureModule from "@/components/module/<Domain>/<FeatureName>";

const Page = () => {
  return <FeatureModule />;
};

export default Page;
```

---

### 2. Feature Modules (`src/components/module/<Domain>/<FeatureName>/`)
- Encapsulate all feature-specific code here:
  - State management (local & global)
  - RTK Query hooks / API calls
  - Mock data / constants
  - Feature UI logic
- **Main Entry / Orchestrator**: `index.tsx` within the feature folder.
- **Decomposition**: Break down UI sections (e.g., cards, tables, charts, modals, filter bars) into dedicated files within the same feature folder.

---

### 3. Shared Components & Primitives
- **Shared Layout Elements**: `src/components/shared/` (e.g., header, sidebar, footer, loaders, navigation).
- **Reusable UI Primitives**: `src/components/ui/` (e.g., buttons, badges, dialogs, dropdowns, tooltips).
- **Form Inputs & Fields**: `src/components/form/` (e.g., text inputs, selects, switches, datepickers, form wrappers).
