---
trigger: always_on
description: Strict architectural rules for pages, feature modules, and component placement.
---

# Project Structure & Architecture Standards

Always follow this strict project structure for all pages and components:

## 1. Page Files (`src/app/**/page.tsx`)
- **Keep extremely concise**: Keep all `page.tsx` files in `src/app/` very short (5 to 10 lines).
- **No Layout JSX / Logic in Pages**: Never write page layout JSX, forms, local/global states, or API logic directly inside `page.tsx`.
- **Sole Responsibility**: The only job of `page.tsx` is to import and render the corresponding module component from `@/components/module/...`.

```tsx
import FeatureModule from "@/components/module/<Domain>/<FeatureName>";

const Page = () => {
  return <FeatureModule />;
};

export default Page;
```

## 2. Feature Modules (`src/components/module/<Domain>/<FeatureName>/`)
- **Encapsulation**: Put all feature code, state management, RTK Query hooks, mock data, and UI logic inside `src/components/module/<Domain>/<FeatureName>/`.
- **Orchestrator**: In each feature folder, use `index.tsx` as the main orchestrator component.
- **Decomposition**: Break down the UI sections (cards, tables, charts, modals, sub-sections) into separate files within that same folder.

## 3. Shared Components & Primitives
- **Shared Layout**: Put shared layout items (sidebar, header, loaders, page wrappers) in `src/components/shared/`.
- **UI Primitives**: Put reusable UI primitives (buttons, badges, tooltips, dialogs, dropdowns, etc.) in `src/components/ui/`.
- **Form Inputs**: Put reusable form inputs, fields, and form controllers in `src/components/form/`.
