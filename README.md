# 🚀 NextStarter: Universal Next.js 16 + Redux Toolkit Starter Pack

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> A modern, beginner-friendly, production-grade frontend starter pack pre-configured with **Next.js 16 (App Router & Turbopack)**, **Redux Toolkit & RTK Query**, **Tailwind CSS**, **Shadcn UI**, and **React Hook Form + Zod**.

---

## 📑 Master Table of Contents

1. [🌟 Architecture & Core Philosophy](#-architecture--core-philosophy)
2. [⚡ Quickstart in 60 Seconds](#-quickstart-in-60-seconds)
3. [📁 Complete Directory & File Map](#-complete-directory--file-map)
4. [🧠 Deep-Dive: Core Systems & Flow](#-deep-dive-core-systems--flow)
   - [1. Next.js 16 App Router & Route Groups](#1-nextjs-16-app-router--route-groups)
   - [2. Dual-Mode Dynamic API Layer (RTK Query)](#2-dual-mode-dynamic-api-layer-rtk-query)
   - [3. Authentication & Route Guard Proxy](#3-authentication--route-guard-proxy)
   - [4. Reusable Form System (`<NRForm>` + Zod)](#4-reusable-form-system-nrform--zod)
   - [5. TanStack Data Table Grid (`<NRTable>`)](#5-tanstack-data-table-grid-nrtable)
   - [6. Design Tokens & Electric Indigo Theme](#6-design-tokens--electric-indigo-theme)
5. [📖 Step-by-Step Developer Cookbooks](#-step-by-step-developer-cookbooks)
   - [Cookbook 1: Creating a New Route & Page](#cookbook-1-creating-a-new-route--page)
   - [Cookbook 2: Adding a New RTK Query API Slice](#cookbook-2-adding-a-new-rtk-query-api-slice)
   - [Cookbook 3: Building a Form with Instant Validation](#cookbook-3-building-a-form-with-instant-validation)
   - [Cookbook 4: Building a Complete CRUD Table with Modal](#cookbook-4-building-a-complete-crud-table-with-modal)
6. [🔌 Environment Configuration (`.env`)](#-environment-configuration-env)
7. [🧪 Verification & Build Commands](#-verification--build-commands)
8. [🚀 Production Deployment (Vercel & Docker)](#-production-deployment-vercel--docker)
9. [📄 License](#-license)

---

## 🌟 Architecture & Core Philosophy

This starter pack is engineered to solve the most common frustrations developers experience when starting a new Next.js project:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER / CLIENT BROWSER                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         [ Next.js 16 App Router ]
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
 ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
 │ (commonLayout)│          │ (authLayout)  │          │(dashboardLay.)│
 │ Public Web    │          │ Sign In / Up  │          │ SaaS Admin    │
 └───────┬───────┘          └───────┬───────┘          └───────┬───────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    │
                        [ Redux Store & Hooks ]
                                    │
                        [ RTK Query baseApi ]
               (Auto-attaches Authorization: Bearer token)
                                    │
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
        [ Real Backend Server? ]        [ Server Offline? ]
          (http://localhost:5000)      (Automatic Mock Fallback)
                     │                             │
                     ▼                             ▼
           Synchronized Live Data          Curated Demo Data
```

### Key Architectural Pillars:
- **Dual-Mode Data Layer**: The UI works instantly out of the box with curated demo data, but connects seamlessly to real REST endpoints when you set `NEXT_PUBLIC_BASE_URL` in `.env`.
- **Zero Orphaned Code**: 100% clean, modular code with 0 TypeScript errors and 0 ESLint warnings.
- **Declarative Form Engine**: Build fully validated forms in less than 15 lines of code.
- **Enterprise Design Tokens**: Clean typography, glassmorphism, responsive drawers, and modern Tailwind CSS variables.

---

## ⚡ Quickstart in 60 Seconds

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/Frontend-code-base.git
cd Frontend-code-base
npm install
```

### 2. Configure Environment Variables
Copy the pre-configured `.env.example` template:
```bash
cp .env.example .env
```

### 3. Launch Development Server
```bash
npm run dev
```

Visit the running application in your browser:
- 🌐 **Public Website**: [http://localhost:3000](http://localhost:3000)
- 📊 **Admin Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- 🔐 **Sign In**: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- 📝 **Sign Up**: [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)

---

## 📁 Complete Directory & File Map

```text
Frontend-code-base/
├── public/                         # Static assets (brand logos, user avatars)
│   └── images/                     # Placeholder profile photos and illustrations
│
├── src/
│   ├── app/                        # Next.js 16 App Router Routes
│   │   ├── (authLayout)/           # Route Group: Auth pages (minimal centered layout)
│   │   │   └── auth/
│   │   │       ├── signin/         # Sign In page (/auth/signin)
│   │   │       ├── signup/         # Sign Up page (/auth/signup)
│   │   │       ├── verify-otp/     # OTP verification page (/auth/verify-otp)
│   │   │       ├── forgot-password/# Password recovery request
│   │   │       └── reset-password/ # New password entry
│   │   │
│   │   ├── (commonLayout)/         # Route Group: Public website (with Navbar + Footer)
│   │   │   ├── page.tsx            # Main Landing Page (/)
│   │   │   └── layout.tsx          # Public wrapper (Navbar + Main + Footer)
│   │   │
│   │   ├── (dashboardLayout)/      # Route Group: SaaS Admin Dashboard
│   │   │   ├── layout.tsx          # Dashboard shell (Sidebar + AppHeader + Outlet)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx        # Overview (/dashboard)
│   │   │       ├── admin/users/    # User management CRUD (/dashboard/admin/users)
│   │   │       ├── projects/       # Projects & milestones (/dashboard/projects)
│   │   │       ├── packages/       # Pricing packages & tiers (/dashboard/packages)
│   │   │       ├── payments/       # Financial transactions (/dashboard/payments)
│   │   │       ├── payouts/        # Withdrawal review (/dashboard/payouts)
│   │   │       ├── messages/       # Real-time chat demo (/dashboard/messages)
│   │   │       ├── notifications/  # Notification center (/dashboard/notifications)
│   │   │       ├── subscriptions/  # Plan tiers (/dashboard/subscriptions)
│   │   │       ├── profile/        # Account & avatar upload (/dashboard/profile)
│   │   │       └── support/        # Help FAQ & ticket submission (/dashboard/support)
│   │   │
│   │   ├── globals.css             # Theme design tokens & CSS variables
│   │   └── layout.tsx              # Root Provider Layout (Redux + Toaster)
│   │
│   ├── components/                 # Reusable React Components
│   │   ├── auth/                   # SignInForm, SignUpForm, OtpInput, ForgotPassword
│   │   ├── common/                 # Public Navbar.tsx and Footer.tsx
│   │   ├── form/                   # NRForm.tsx, NRInput.tsx, NRSelect.tsx (Zod wrappers)
│   │   ├── home/                   # HeroSection, TechStackSection, FeaturesSection, QuickstartSection
│   │   ├── shared/                 # app-sidebar.tsx, nav-main.tsx, nav-user.tsx, AppHeader.tsx
│   │   └── ui/                     # Shadcn UI primitives (Button, Dialog, Sheet, Table, Badge)
│   │
│   ├── constants/
│   │   └── demoData.tsx            # Centralized offline mock data store
│   │
│   ├── redux/                      # Redux State Management & RTK Query
│   │   ├── api/                    # RTK Query Services
│   │   │   ├── baseApi.ts          # Central base API with auth query & cache tags
│   │   │   ├── authApi.ts          # Auth, registration, profile, password endpoints
│   │   │   ├── userApi.ts          # User management CRUD endpoints
│   │   │   ├── projectsApi.ts      # Projects & milestone status endpoints
│   │   │   ├── packagesApi.ts      # Pricing package endpoints
│   │   │   ├── paymentApi.ts       # Transactions & checkout session endpoints
│   │   │   ├── payoutApi.ts        # Payout review & approval endpoints
│   │   │   ├── chatApi.ts          # Messaging & conversations endpoints
│   │   │   ├── analyticsApi.ts     # Dashboard statistics & revenue charts endpoints
│   │   │   └── uploaderApi.ts      # Multipart FormData file upload endpoints
│   │   │
│   │   ├── features/
│   │   │   └── auth/authSlice.ts   # Redux slice for JWT token and current user
│   │   ├── hooks.ts                # Typed Redux hooks (useAppDispatch, useAppSelector)
│   │   └── store.ts                # Redux store with SSR-safe storage configuration
│   │
│   ├── types/
│   │   └── index.ts                # Global TypeScript models, interfaces, and enums
│   │
│   └── proxy.ts                    # Next.js 16 Route Guard & Request Proxy
│
├── .env.example                    # Environment template
├── package.json                    # Dependencies & npm scripts
└── tsconfig.json                   # TypeScript configuration
```

---

## 🧠 Deep-Dive: Core Systems & Flow

### 1. Next.js 16 App Router & Route Groups

Next.js uses folder-based routing. Folders wrapped in parentheses `(...)` are **Route Groups**. They allow you to apply distinct layouts without altering the browser URL:

| File Location | Browser URL | Layout Wrapper |
| :--- | :--- | :--- |
| `src/app/(commonLayout)/page.tsx` | `/` | Public Navbar + Footer |
| `src/app/(authLayout)/auth/signin/page.tsx` | `/auth/signin` | Centered Auth Card |
| `src/app/(dashboardLayout)/dashboard/page.tsx` | `/dashboard` | Sidebar + AppHeader |
| `src/app/(dashboardLayout)/dashboard/admin/users/page.tsx` | `/dashboard/admin/users` | Sidebar + AppHeader |

---

### 2. Dual-Mode Dynamic API Layer (RTK Query)

All API services inject endpoints into the central `baseApi` defined in [`src/redux/api/baseApi.ts`](file:///c:/Users/ashiq/Desktop/Code%20Base/Frontend-code-base/src/redux/api/baseApi.ts).

#### How It Works:
1. **Automatic Header Injection**: When a user logs in, their JWT token is stored in Redux (`state.auth.token`). The `prepareHeaders` function automatically attaches `Authorization: Bearer <TOKEN>` to every request.
2. **Auto-Logout on 401/403**: If a token expires and the server returns `401 Unauthorized`, the middleware automatically dispatches `logout()` to reset state.
3. **Automatic Cache Tags**: Endpoints provide and invalidate tags (`"User"`, `"Project"`, `"Analytics"`). For example, creating a user automatically refetches `getUserList`.
4. **Offline Demo Fallback**: Pages are wired to check `apiData?.data || fallbackDemoData`, ensuring the app never breaks when developing offline.

---

### 3. Authentication & Route Guard Proxy

Authentication state flows across three synchronized layers:

1. **Redux Store (`authSlice.ts`)**: Stores the active user object and JWT token in memory for instant reactivity.
2. **HTTP Cookies (`accessToken`)**: Stores the token in browser cookies so it persists across page refreshes.
3. **Route Guard Proxy (`src/proxy.ts`)**: Next.js 16 proxy intercepts requests to ensure unauthenticated users cannot access protected `/dashboard/*` routes.

---

### 4. Reusable Form System (`<NRForm>` + Zod)

Instead of writing repetitive boilerplate for form state, errors, and input bindings, this starter pack provides a unified form engine:

- `<NRForm schema={zodSchema} onSubmit={handleSubmit}>`: Form context wrapper that manages validation state.
- `<NRInput name="email" label="Email Address" />`: Renders an accessible input that automatically displays Zod validation errors.
- `<NRSelect name="role" label="Role" options={[...]} />`: Renders a validated dropdown selector.

---

### 5. TanStack Data Table Grid (`<NRTable>`)

Located in `src/components/ui/core/NRTable.tsx`, this component wraps TanStack Table v8 with:
- Search filtering across all fields.
- Column sorting.
- Pagination controls.
- Custom cell renderers (Badges, action buttons, formatted dates).

---

### 6. Design Tokens & Electric Indigo Theme

The color palette is configured using CSS custom properties in [`src/app/globals.css`](file:///c:/Users/ashiq/Desktop/Code%20Base/Frontend-code-base/src/app/globals.css):

```css
:root {
  --primary: #4f46e5;          /* Electric Indigo 600 */
  --primary-foreground: #ffffff;
  --ring: #6366f1;             /* Indigo 500 */
  --background: #ffffff;
  --foreground: #09090b;
}
```

To switch to a different brand color (such as Emerald, Violet, Rose, or Sky), simply update the hex values in `globals.css`!

---

## 📖 Step-by-Step Developer Cookbooks

### Cookbook 1: Creating a New Route & Page

Let's create a new **Analytics** page at `/dashboard/analytics`.

#### Step 1: Create the Page File
Create `src/app/(dashboardLayout)/dashboard/analytics/page.tsx`:
```tsx
"use client";

import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Detailed performance metrics and growth trends.</p>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-bold">Monthly Growth</p>
          <p className="text-2xl font-black text-slate-900">+24.8%</p>
        </div>
      </div>
    </div>
  );
}
```

#### Step 2: Add to Sidebar Navigation
Open [`src/components/shared/app-sidebar.tsx`](file:///c:/Users/ashiq/Desktop/Code%20Base/Frontend-code-base/src/components/shared/app-sidebar.tsx) and add the item:
```tsx
{
  title: "Analytics",
  url: "/dashboard/analytics",
  icon: BarChart3,
}
```

That's it! Your new page is live at `/dashboard/analytics` with the full sidebar layout.

---

### Cookbook 2: Adding a New RTK Query API Slice

Let's create an API slice for managing **Invoices**.

#### Step 1: Define TypeScript Types
Open [`src/types/index.ts`](file:///c:/Users/ashiq/Desktop/Code%20Base/Frontend-code-base/src/types/index.ts) and add:
```typescript
export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  dueDate: string;
}
```

#### Step 2: Create the API Slice
Create `src/redux/api/invoiceApi.ts`:
```typescript
import baseApi from "@/redux/api/baseApi";
import { ApiResponse, Invoice } from "@/types";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /invoices
    getInvoices: builder.query<ApiResponse<Invoice[]>, void>({
      query: () => "/invoices",
      providesTags: ["Payment"],
    }),

    // POST /invoices
    createInvoice: builder.mutation<ApiResponse<Invoice>, Partial<Invoice>>({
      query: (body) => ({
        url: "/invoices",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetInvoicesQuery, useCreateInvoiceMutation } = invoiceApi;
export default invoiceApi;
```

#### Step 3: Use the Hook in Your Component
```tsx
const { data: invoiceResponse, isLoading } = useGetInvoicesQuery();
const [createInvoice, { isLoading: isCreating }] = useCreateInvoiceMutation();
```

---

### Cookbook 3: Building a Form with Instant Validation

Here is how to create a validated form in under 20 lines of code:

```tsx
"use client";

import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

// 1. Define schema
const userFormSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["ADMIN", "USER", "MANAGER"]),
});

export default function AddUserForm() {
  // 2. Submit handler
  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    toast.success(`User ${values.fullName} created successfully!`);
  };

  return (
    <NRForm schema={userFormSchema} onSubmit={onSubmit}>
      <div className="space-y-4 max-w-md bg-white p-6 rounded-2xl border border-slate-100">
        <NRInput name="fullName" label="Full Name" placeholder="e.g. Jane Doe" />
        <NRInput name="email" label="Email Address" type="email" placeholder="jane@example.com" />
        <NRSelect
          name="role"
          label="Account Role"
          options={[
            { label: "Standard User", value: "USER" },
            { label: "Administrator", value: "ADMIN" },
            { label: "Manager", value: "MANAGER" },
          ]}
        />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
          Create User
        </Button>
      </div>
    </NRForm>
  );
}
```

---

### Cookbook 4: Building a Complete CRUD Table with Modal

Here is the complete pattern for displaying a searchable table with a details dialog:

```tsx
"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Pending";
}

export default function MembersTable() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const columns: ColumnDef<Member, any>[] = [
    {
      accessorKey: "name",
      header: "Member Name",
      cell: ({ row }) => <span className="font-bold text-xs">{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-xs text-slate-500">{row.original.email}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={row.original.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button onClick={() => setSelectedMember(row.original)} variant="outline" size="sm" className="h-8 text-xs gap-1">
          <Eye className="w-3.5 h-3.5" /> View
        </Button>
      ),
    },
  ];

  const sampleMembers: Member[] = [
    { id: "1", name: "Sarah Connor", email: "sarah@example.com", status: "Active" },
    { id: "2", name: "John Doe", email: "john@example.com", status: "Pending" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100">
      <NRTable columns={columns} data={sampleMembers} />

      {/* Details Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">{selectedMember.name}</DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-500">{selectedMember.email}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
```

---

## 🔌 Environment Configuration (`.env`)

Template file: `.env.example`

```env
# Mode (development | production)
NEXT_PUBLIC_ENV=development

# Frontend Dev Server Port (default 3000)
NEXT_PUBLIC_PORT=3000

# Backend REST API URL (where your Express / NestJS / Django backend runs)
NEXT_PUBLIC_BASE_URL=https://code-base-beta.vercel.app/api/v1
NEXT_PUBLIC_DEV_BASE_URL=https://code-base-beta.vercel.app/api/v1

# Real-time WebSocket Server URL for live chat
NEXT_PUBLIC_WS_URL=wss://code-base-beta.vercel.app
```

---

## 🧪 Verification & Build Commands

All commands have been verified with **0 errors and 0 warnings**:

```bash
# Start local development server with Turbopack
npm run dev

# Run TypeScript type-checker across all files
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build optimized production bundle
npm run build

# Preview production build locally
npm run start
```

---

## 🚀 Production Deployment

### 1. Deploying to Vercel (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Add the following **Environment Variables**:
   - `NEXT_PUBLIC_ENV` = `production`
   - `NEXT_PUBLIC_BASE_URL` = `https://your-production-api.com/api/v1`
5. Click **Deploy**. Vercel will automatically build and optimize your static and dynamic routes.

### 2. Docker Deployment

Create a `Dockerfile` in the root:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📄 License

This starter pack is licensed under the following terms:

```text
Copyright (c) 2026 Md. Ashiqur Rahman Tonmoy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to copy
and use the Software, subject to the following conditions:

- You are permitted to copy and use the Software.
- You are NOT permitted to modify, alter, adapt, or create derivative works of the Software without explicit written permission from the copyright holder.
- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
```
