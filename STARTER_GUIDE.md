# 🚀 DevHub Frontend Starter Pack & Implementation Guide

Welcome to the **DevHub Frontend Starter Pack** — a modern, production-grade Next.js 16 + Redux Toolkit + RTK Query + Tailwind CSS + Shadcn UI dashboard architecture.

---

## 📁 Architecture Overview

```text
Frontend-code-base/
├── public/                 # Static brand assets (Logo, avatars, illustrations)
├── src/
│   ├── app/                # Next.js 16 App Router (grouped layout routes)
│   │   ├── (authLayout)/   # Authentication pages (signin, signup, otp, reset-pass)
│   │   ├── (dashboardLayout)/ # SaaS Dashboard routes (overview, users, projects, etc.)
│   │   ├── globals.css     # Design tokens (Electric Indigo SaaS theme)
│   │   └── layout.tsx      # Root provider wrapper (Redux + Toaster)
│   ├── components/
│   │   ├── form/           # Reusable NRForm, NRInput, NRSelect form controls
│   │   ├── ui/             # Shadcn UI primitives (button, dialog, avatar, table, badge)
│   │   ├── shared/         # AppHeader, AppSidebar, NavMain, NavUser
│   │   └── module/         # Feature-specific dashboard components
│   ├── constants/
│   │   └── demoData.tsx    # Centralized fallback demo data store
│   ├── redux/
│   │   ├── api/            # RTK Query API slices (auth, user, projects, packages, etc.)
│   │   ├── features/       # Redux slices (authSlice, etc.)
│   │   └── store.ts        # Redux store configuration with SSR-safe storage
│   ├── types/              # Complete TypeScript interfaces & enums
│   └── proxy.ts            # Next.js 16 authentication & route guard proxy
```

---

## 🔌 Connecting to Your Backend API

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_DEV_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

### 2. Dual-Mode Dynamic API Pattern
Every page in this starter pack automatically supports **Dual-Mode**:
- **Live Mode**: When your backend API server is online, pages fetch and display real database records via RTK Query hooks (`useGetProjectsQuery`, `useGetPackagesQuery`, etc.).
- **Demo Mode**: When the backend is offline or during frontend prototyping, pages gracefully fall back to rich, curated mock data from `src/constants/demoData.tsx` with instant toast feedback.

---

## 📦 Adding a New API Endpoint

To add a new entity (e.g. `Invoices`), follow these 3 simple steps:

1. **Define the Types** in `src/types/index.ts`:
   ```typescript
   export interface Invoice {
     id: string;
     amount: number;
     status: "PAID" | "PENDING";
     createdAt: string;
   }
   ```

2. **Create the RTK Query Slice** in `src/redux/api/invoiceApi.ts`:
   ```typescript
   import baseApi from "@/redux/api/baseApi";
   import { ApiResponse, Invoice } from "@/types";

   export const invoiceApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
       getInvoices: builder.query<ApiResponse<Invoice[]>, void>({
         query: () => "/invoices",
         providesTags: ["Payment"],
       }),
     }),
     overrideExisting: true,
   });

   export const { useGetInvoicesQuery } = invoiceApi;
   ```

3. **Use the Hook in your Page**:
   ```typescript
   const { data: invoicesData, isLoading } = useGetInvoicesQuery();
   const displayInvoices = invoicesData?.data || fallbackInvoices;
   ```

---

## 🛡️ Form Validation with `<NRForm>`

Forms use **React Hook Form** + **Zod**:
```tsx
import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
});

export default function MyForm() {
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <NRForm schema={schema} onSubmit={onSubmit}>
      <NRInput name="title" label="Project Title" />
      <button type="submit">Submit</button>
    </NRForm>
  );
}
```

---

## 🧪 Verification Commands

```bash
# Check TypeScript types
npx tsc --noEmit

# Run ESLint
npm run lint

# Production bundle build
npx next build

# Start dev server
npm run dev
```
