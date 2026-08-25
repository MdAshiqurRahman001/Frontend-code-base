# 🚀 NextStarter: Universal Next.js 16 + Redux Toolkit Starter Pack

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> A modern, beginner-friendly, production-ready frontend starter pack pre-configured with **Next.js 16 (App Router)**, **Redux Toolkit & RTK Query**, **Tailwind CSS**, **Shadcn UI**, and **React Hook Form + Zod**.

---

## 📑 Table of Contents

1. [🌟 Features & Tech Stack](#-features--tech-stack)
2. [⚡ Quickstart (Under 60 Seconds)](#-quickstart-under-60-seconds)
3. [📁 Folder Structure Explained](#-folder-structure-explained)
4. [🔌 Connecting Your Backend API](#-connecting-your-backend-api)
   - [Dual-Mode Dynamic API Pattern](#dual-mode-dynamic-api-pattern)
   - [Environment Variables Setup](#environment-variables-setup)
5. [📖 Step-by-Step Developer Tutorials](#-step-by-step-developer-tutorials)
   - [Tutorial 1: Creating a New Page](#tutorial-1-creating-a-new-page)
   - [Tutorial 2: Adding a New RTK Query Endpoint](#tutorial-2-adding-a-new-rtk-query-endpoint)
   - [Tutorial 3: Creating Validated Forms with `<NRForm>`](#tutorial-3-creating-validated-forms-with-nrform)
   - [Tutorial 4: Displaying Data in TanStack Tables with `<NRTable>`](#tutorial-4-displaying-data-in-tanstack-tables-with-nrtable)
6. [🔐 Authentication & Route Guards](#-authentication--route-guards)
7. [🎨 Theme & Styling Customization](#-theme--styling-customization)
8. [🧪 Verification & Scripts](#-verification--scripts)
9. [🚀 Production Deployment](#-production-deployment)

---

## 🌟 Features & Tech Stack

| Technology | Purpose | Key Benefits |
| :--- | :--- | :--- |
| **Next.js 16** | Fullstack React Framework | App Router, Turbopack, grouped layouts, and Server/Client Components. |
| **Redux Toolkit & RTK Query** | Central State & Data Fetching | Automatic caching, polling, Bearer token injection, and cache tag revalidation. |
| **Tailwind CSS** | Styling Engine | Electric Indigo theme tokens, dark mode variables, and responsive layout classes. |
| **Shadcn UI & Radix Primitives** | Component Primitives | Accessible dialogs, drawers, dropdowns, avatars, buttons, and alerts. |
| **React Hook Form + Zod** | Form Handling & Validation | Declarative type-safe schemas with automatic inline error feedback. |
| **TanStack Table v8** | Data Grid | Headless data table with sorting, pagination, search, and custom cells. |
| **Lucide Icons** | Visual Iconography | Clean, consistent icons across all pages and navigation menus. |
| **Sonner** | Toast Notifications | Modern toast alerts for user feedback on mutations and form submissions. |

---

## ⚡ Quickstart (Under 60 Seconds)

### Step 1: Clone or Open the Repository
```bash
cd Frontend-code-base
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
Copy the example environment template:
```bash
cp .env.example .env
```

### Step 4: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- **Public Landing Page**: [http://localhost:3000/](http://localhost:3000/)
- **Admin Dashboard Demo**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Sign In Demo**: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)

---

## 📁 Folder Structure Explained

```text
Frontend-code-base/
├── public/                     # Static assets (images, icons, avatars)
├── src/
│   ├── app/                    # Next.js 16 App Router Pages
│   │   ├── (authLayout)/auth/  # Authentication pages (signin, signup, otp, reset)
│   │   ├── (commonLayout)/     # Public marketing & landing pages
│   │   ├── (dashboardLayout)/  # SaaS Admin Dashboard pages
│   │   │   └── dashboard/      # Overview, Users, Profile, Notifications, etc.
│   │   ├── globals.css         # Theme design tokens & CSS utilities
│   │   └── layout.tsx          # Root provider (Redux Provider + Toaster)
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── common/             # Public Navbar and Footer
│   │   ├── form/               # NRForm, NRInput, NRSelect form controls
│   │   ├── home/               # Modular landing page sections
│   │   ├── shared/             # AppHeader, AppSidebar, NavMain, NavUser
│   │   └── ui/                 # Shadcn UI primitives (Button, Dialog, Badge, Table)
│   │
│   ├── constants/
│   │   └── demoData.tsx        # Centralized mock data store for offline demo mode
│   │
│   ├── redux/                  # Redux Toolkit & RTK Query
│   │   ├── api/                # RTK Query API slices (baseApi, authApi, userApi, etc.)
│   │   ├── features/           # Redux state slices (authSlice)
│   │   └── store.ts            # Redux store configuration
│   │
│   ├── types/
│   │   └── index.ts            # Central TypeScript interfaces & enums
│   │
│   └── proxy.ts                # Next.js 16 Route Guard & Token Verification
│
├── .env.example                # Environment variables template
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🔌 Connecting Your Backend API

### Dual-Mode Dynamic API Pattern

This starter pack is engineered with **Dual-Mode Data Fetching**:
1. **Live Backend Mode**: When your backend API server is online, RTK Query hooks fetch, cache, and synchronize real database records.
2. **Demo Mode (Graceful Fallback)**: If your backend is offline, in development, or encountering network issues, pages automatically fall back to rich, curated mock data from `src/constants/demoData.tsx` with instant toast notifications. Your frontend **never crashes or displays blank screens**.

### Environment Variables Setup

Configure `.env` in the project root:

```env
# Mode (development | production)
NEXT_PUBLIC_ENV=development

# Backend REST API URL (e.g. Node.js Express, NestJS, Django, FastAPI, Laravel)
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_DEV_BASE_URL=http://localhost:5000/api/v1

# Real-time WebSocket Server URL (Optional for live chat)
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

---

## 📖 Step-by-Step Developer Tutorials

### Tutorial 1: Creating a New Page

In Next.js App Router, creating a folder with a `page.tsx` file creates a new URL route.

**Example**: Adding a `/dashboard/products` page.

1. Create `src/app/(dashboardLayout)/dashboard/products/page.tsx`:
```tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Products Directory</h1>
          <p className="text-sm text-slate-500">Manage your catalog items here.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-600 text-sm">Product list items will appear here.</p>
      </div>
    </div>
  );
}
```

2. Add the link to `src/components/shared/app-sidebar.tsx` so it appears in the sidebar!

---

### Tutorial 2: Adding a New RTK Query Endpoint

RTK Query eliminates manual `fetch` calls, loading states, and `useEffect` boilerplate.

**Example**: Creating a `productsApi.ts` service.

1. Create `src/redux/api/productsApi.ts`:
```typescript
import baseApi from "@/redux/api/baseApi";
import { ApiResponse } from "@/types";

export interface Product {
  id: string | number;
  title: string;
  price: number;
  category: string;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /products
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => "/products",
      providesTags: ["User"],
    }),

    // POST /products
    createProduct: builder.mutation<ApiResponse<Product>, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
export default productsApi;
```

2. Use the hook in any component with automatic loading & data states:
```tsx
const { data, isLoading, error } = useGetProductsQuery();
const [createProduct] = useCreateProductMutation();
```

---

### Tutorial 3: Creating Validated Forms with `<NRForm>`

Forms in this starter pack use **React Hook Form** coupled with **Zod Schema Validation**.

```tsx
"use client";

import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

// 1. Define your Zod schema with validation rules
const productSchema = z.object({
  title: z.string().min(2, "Product title must be at least 2 characters"),
  price: z.coerce.number().min(1, "Price must be greater than $0"),
  category: z.string().min(1, "Please select a category"),
});

export default function CreateProductModal() {
  // 2. Form submission handler
  const handleSave = async (values: z.infer<typeof productSchema>) => {
    console.log("Form data:", values);
    toast.success(`Product "${values.title}" created!`);
  };

  return (
    <NRForm schema={productSchema} onSubmit={handleSave}>
      <div className="space-y-4 max-w-md bg-white p-6 rounded-2xl border border-slate-100">
        <NRInput
          name="title"
          label="Product Name"
          placeholder="e.g. Wireless Noise-Cancelling Headphones"
        />

        <NRInput
          name="price"
          label="Price ($ USD)"
          type="number"
          placeholder="149.99"
        />

        <NRSelect
          name="category"
          label="Category"
          options={[
            { label: "Electronics", value: "electronics" },
            { label: "Design", value: "design" },
            { label: "Software", value: "software" },
          ]}
        />

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
          Submit Form
        </Button>
      </div>
    </NRForm>
  );
}
```

---

### Tutorial 4: Displaying Data in TanStack Tables with `<NRTable>`

The `<NRTable>` component wraps `@tanstack/react-table` with sorting, search filtering, and custom badges.

```tsx
"use client";

import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

interface ProductRow {
  id: string;
  name: string;
  price: string;
  status: "Active" | "Out of Stock";
}

const columns: ColumnDef<ProductRow, any>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => <span className="font-bold text-xs">{row.original.name}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="font-extrabold text-xs">{row.original.price}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={row.original.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const sampleData: ProductRow[] = [
  { id: "1", name: "Pro Headphones", price: "$149.00", status: "Active" },
  { id: "2", name: "USB-C Hub", price: "$49.00", status: "Active" },
];

export default function DataTableDemo() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      <NRTable columns={columns} data={sampleData} />
    </div>
  );
}
```

---

## 🔐 Authentication & Route Guards

### How Authentication Works:
1. **User Sign In** (`/auth/signin`): Dispatches credentials to `useLoginMutation()`.
2. **Token Storage**: On success, the JWT token is stored in both Redux (`authSlice`) and browser HTTP cookies (`accessToken`).
3. **Route Guard Proxy** (`src/proxy.ts`): In Next.js 16, `proxy.ts` intercepts requests:
   - Unauthenticated visitors trying to access `/dashboard/*` are automatically redirected to `/auth/signin`.
   - Logged-in users visiting `/auth/*` are redirected directly to `/dashboard`.
4. **Auto Bearer Token**: RTK Query's `baseApi` automatically includes `Authorization: Bearer <TOKEN>` with every backend HTTP request.

---

## 🎨 Theme & Styling Customization

The design system is centered on the modern **Electric Indigo** palette configured in `src/app/globals.css`:

```css
:root {
  --primary: #4f46e5;       /* Indigo 600 */
  --primary-foreground: #ffffff;
  --ring: #6366f1;          /* Indigo 500 */
}
```

To switch to your own brand color (e.g. Emerald, Violet, Sky, or Amber), simply change the CSS variable values in `src/app/globals.css`!

---

## 🧪 Verification & Scripts

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | Dev Server | Starts Next.js with Turbopack fast refresh. |
| `npx tsc --noEmit` | Type Check | Validates 100% of TypeScript types across the codebase. |
| `npm run lint` | ESLint | Checks and fixes ESLint rules and formatting. |
| `npm run build` | Build Bundle | Compiles production-optimized static & SSR pages. |
| `npm run start` | Production Server | Runs the compiled production build locally. |

---

## 🚀 Production Deployment

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the repository into [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_ENV`: `production`
   - `NEXT_PUBLIC_BASE_URL`: `https://api.yourdomain.com/api/v1`
4. Click **Deploy**. Vercel will automatically build and deploy your Next.js 16 app with edge caching.

---

## 📄 License

This starter pack is licensed under the [MIT License](LICENSE). You are free to use it for personal, commercial, and client projects!
