# 📚 Complete Next.js + Redux Guide

> This guide is written specifically around this project. Every example uses the **actual files** in this repo.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **State Management**: Redux Toolkit + RTK Query + Redux Persist
- **Styling**: Tailwind CSS v4 + Radix UI + class-variance-authority
- **Real-Time**: Native WebSockets (`useWebSocket` hook)
- **Forms**: React Hook Form
- **Animations**: Framer Motion (`motion`) + Lottie (`@lottiefiles/dotlottie-react`)
- **Icons & UI**: Lucide React, Swiper, SweetAlert2, Sonner

---

## 🗂️ Project Structure At a Glance

```
src/
├── app/                          ← Next.js App Router (pages & layouts)
│   ├── layout.tsx                ← Root layout (wraps EVERYTHING)
│   ├── globals.css               ← Global styles (Tailwind v4)
│   ├── (authLayout)/             ← Route group for auth pages
│   │   └── auth/
│   │       ├── layout.tsx        ← Shared auth layout
│   │       ├── signin/page.tsx   ← /auth/signin
│   │       └── signup/page.tsx   ← /auth/signup
│   └── (dashboardLayout)/        ← Route group for dashboard
│       └── dashboard/
│           ├── layout.tsx        ← Dashboard shell (sidebar + header)
│           └── page.tsx          ← /dashboard
├── components/                   ← Reusable UI components
│   ├── dashboardLayout/          ← Sidebar, Header, Nav components
│   ├── form/                     ← Form wrappers (react-hook-form)
│   ├── providers/                ← React context providers (e.g., WebSocketProvider)
│   └── ui/                       ← shadcn/ui primitives
├── hooks/                        ← Custom React hooks
│   ├── redux.ts                  ← Typed useAppSelector & useAppDispatch hooks
│   └── use-mobile.ts             ← useIsMobile() hook
├── redux/                        ← All Redux/RTK Query logic
│   ├── Provider.tsx              ← Redux + PersistGate wrapper
│   ├── store.ts                  ← Configured Redux store
│   ├── api/
│   │   └── baseApi.ts            ← RTK Query base API instance
│   └── features/
│       ├── rootReducer.ts        ← Combined reducer
│       └── auth/
│           └── authSlice.ts      ← Auth state slice (User, AuthState types)
├── fonts/                        ← Custom font definitions
├── lib/
│   └── utils.ts                  ← cn() helper (clsx + tailwind-merge)
├── types/                        ← TypeScript interfaces (AppNotification, Chat, etc.)
└── middleware.ts                 ← Next.js middleware (auth guard)
```

---

## 🧠 PART 1 — NEXT.JS (App Router)

### Concept 1: The App Router & File-Based Routing

Next.js uses your **folder structure** to define URLs automatically. Any folder inside `src/app/` with a `page.tsx` becomes a route.

| File | URL in Browser |
|---|---|
| `src/app/(authLayout)/auth/signin/page.tsx` | `/auth/signin` |
| `src/app/(authLayout)/auth/signup/page.tsx` | `/auth/signup` |
| `src/app/(dashboardLayout)/dashboard/page.tsx` | `/dashboard` |

> **Key insight:** Folders wrapped in `(parentheses)` are called **Route Groups** — they organize your code without affecting the URL. This project uses `(authLayout)` and `(dashboardLayout)` as route groups.

---

### Concept 2: Layouts — Shared UI Wrapping Pages

A `layout.tsx` file **wraps** all pages inside its folder and sub-folders. It stays mounted while its child pages change — this is what makes navigation feel instant.

**Layout Hierarchy:**

```
layout.tsx (Root)
  └── (authLayout)/auth/layout.tsx          ← Wraps signin & signup
  └── (dashboardLayout)/dashboard/layout.tsx ← Wraps dashboard pages (sidebar + header)
```

**Root Layout** — `src/app/layout.tsx`:

```tsx
// Wraps EVERY page on the entire site
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ... antialiased`}>
        <Suspense fallback={<Loading />}>
          <ReduxProvider>        {/* ← Redux store available everywhere */}
            {children}           {/* ← Your actual page renders here */}
            <Toaster ... />
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
```

**Dashboard Layout** — `src/app/(dashboardLayout)/dashboard/layout.tsx`:

```tsx
// Wraps only dashboard pages — sidebar + header always visible
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <SidebarProvider>
        <AppSidebar />          {/* ← Always rendered on dashboard pages */}
        <SidebarInset>
          <AppHeader />
          <div>{children}</div> {/* ← dashboard/page.tsx renders here */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
```

> **When to add a new layout:** When you want a group of pages to share the same chrome (sidebar, header, nav). For example, adding an `/dashboard/admin/...` section.

---

### Concept 3: Server vs Client Components

This is the **most critical** Next.js concept to understand.

| | Server Component (default) | Client Component (`"use client"`) |
|---|---|---|
| **Runs on** | Server only | Browser |
| **Can use** | `async/await`, server data | `useState`, `useEffect`, hooks |
| **Cannot use** | `useState`, `useEffect`, browser APIs | Server-side caching |
| **Examples in this repo** | `layout.tsx`, `page.tsx` files | `AppSidebar.tsx`, `Provider.tsx` |

**Rule of thumb for this project:**
- Pages/layouts that display server-fetched data → **Server Component** (no `"use client"`)
- Components that use Redux selectors, `useState`, event handlers → **Client Component** (add `"use client"` at the top)

`AppSidebar.tsx` correctly uses `"use client"` because it calls `useAppSelector` and `usePathname`:

```tsx
"use client";  // ← Required because we use hooks below

import { useAppSelector } from "@/hooks/redux";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();           // ← Hook: needs "use client"
  const currentUser = useAppSelector(...); // ← Typed Redux hook: needs "use client"
}
```

---

### Concept 4: Adding New Pages (Step by Step)

**Scenario: Add a `/dashboard/users` page**

1. Create the folder: `src/app/(dashboardLayout)/dashboard/users/`
2. Create `page.tsx` inside it:

```tsx
// src/app/(dashboardLayout)/dashboard/users/page.tsx
import React from 'react'

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}
```

3. It is immediately accessible at `/dashboard/users` — **no router config needed**.

**Scenario: Add a nested dynamic route `/dashboard/users/[id]`**

```
src/app/(dashboardLayout)/dashboard/users/
├── page.tsx          ← /dashboard/users
└── [id]/
    └── page.tsx      ← /dashboard/users/123
```

```tsx
// src/app/(dashboardLayout)/dashboard/users/[id]/page.tsx
export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <div>User ID: {params.id}</div>
}
```

---

### Concept 5: Middleware — `src/middleware.ts`

The middleware runs **before every request**. It is already correctly set up at `src/middleware.ts`.

> ⚠️ **Note:** Next.js requires this file to be named exactly **`middleware.ts`** inside `src/`. Any other name (e.g. `proxy.ts`) is silently ignored.

Current state — allows all requests through (development mode):

```ts
export default function middleware(request: NextRequest) {
  return NextResponse.next(); // Currently: allows everything through
}

export const config = {
  // Runs on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
```

**When you are ready to add auth protection**, replace the body with:

```ts
export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
}
```

---

## 🔴 PART 2 — REDUX TOOLKIT (RTK + RTK Query)

### Concept 6: Redux Architecture

The Redux setup has **two layers**:

```
redux/
├── store.ts              ← The single source of truth
├── Provider.tsx          ← Makes the store available to all components
├── api/
│   └── baseApi.ts        ← RTK Query: handles ALL API calls
└── features/
    ├── rootReducer.ts    ← Combines all feature reducers
    └── auth/
        └── authSlice.ts  ← Manages: { user, token }
```

**Data flow:**

```
User Action → dispatch(action) → Slice Reducer → Store updates → Component re-renders
API Call   → RTK Query endpoint → Auto-managed loading/error/data states
```

---

### Concept 7: The Store — `src/redux/store.ts`

```ts
export const store = configureStore({
  reducer: persistedReducer,  // ← All state lives here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ↑ Ignored because redux-persist uses non-serializable data internally
      },
    }).concat(baseApi.middleware), // ← RTK Query needs its own middleware
});

// These two types are critical — always use them instead of plain Redux types
export type RootState = ReturnType<typeof rootReducer>;  // ← Shape of entire state
export type AppDispatch = typeof store.dispatch;          // ← Type-safe dispatch
```

**Redux Persist:** The store saves the `auth` slice to `localStorage` automatically. When the user refreshes, their login stays intact.

```ts
const persistConfig = {
  key: "root",
  storage,            // ← localStorage
  whitelist: ["auth"], // ← ONLY persist auth state. API cache is NOT persisted.
};
```

---

### Concept 8: Auth Slice — `src/redux/features/auth/authSlice.ts`

A **slice** is a self-contained piece of Redux state with:
- Initial state
- Reducers (functions that update state)
- Actions (auto-generated from reducers)
- Selectors (functions to read state)

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type definitions for the auth state
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const authSlice = createSlice({
  name: "auth",           // ← Namespace: actions become "auth/setUser", "auth/logout"
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Redux Toolkit uses Immer — you CAN mutate state directly here
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Selectors — reusable functions to read state
export const selectCurrentUser = (state: RootState): User | null => state.auth.user;
export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
```

**How to use in a component:**

```tsx
"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";

export function UserProfile() {
  const user = useAppSelector(selectCurrentUser); // ← READ — fully typed, no cast needed
  const dispatch = useAppDispatch();              // ← WRITE — type-safe dispatch

  const handleLogout = () => {
    dispatch(logout()); // ← Triggers the logout reducer
  };

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

---

### Concept 9: RTK Query — `src/redux/api/baseApi.ts`

RTK Query **replaces `useEffect` + `fetch`** for API calls. It auto-manages:

- ✅ Loading state
- ✅ Error state
- ✅ Data caching
- ✅ Automatic re-fetching
- ✅ Cache invalidation

The base API is the **foundation** — all feature APIs extend from it:

```ts
export const baseApi = createApi({
  reducerPath: "baseApi",         // ← Where RTK Query stores its cache in Redux
  baseQuery: fetchBaseQuery({
    baseUrl,                      // ← Your API server URL (from .env)
    credentials: "include",       // ← Send cookies with every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ← Auto-attach JWT
      }
      return headers;
    },
  }),
  endpoints: () => ({}),          // ← Empty here; filled by injectEndpoints() in feature files
  tagTypes: [],                   // ← For cache invalidation (add tags as you build)
});
```

---

### Concept 10: Adding a New API Feature (Step by Step)

**Scenario: Add auth API endpoints (login, logout, profile)**

**Step 1:** Create `src/redux/api/authApi.ts`

```ts
import baseApi from "@/redux/api/baseApi";
import { ApiResponse, LoginResponse, User } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation = POST/PUT/DELETE (changes data on the server)
    loginUser: builder.mutation<ApiResponse<LoginResponse>, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Query = GET (fetches data from the server)
    getMyProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),

    logoutUser: builder.mutation<ApiResponse<null>, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
  overrideExisting: false,
});

// Auto-generated hooks — use these in your components
export const { useLoginUserMutation, useGetMyProfileQuery, useLogoutUserMutation } = authApi;
```

**Step 2:** Add `"Auth"` to `tagTypes` in `baseApi.ts` (if it isn't there already).

**Step 3:** Use the hook in your component (e.g., `src/components/auth/SignInForm.tsx`):

```tsx
"use client";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/features/auth/authSlice";

export default function SignInForm() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await loginUser({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }).unwrap(); 
      
      // Save to Redux Filing Cabinet manually (since onQueryStarted isn't used here)
      dispatch(setUser({ user: result.data.user, token: result.data.token }));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Check credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... inputs ... */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

---

### Concept 11: When to Create a New Slice?

In this project, we rely almost entirely on **RTK Query** for state management because most of our data comes from the server. 

You **only** need to create a new Slice (like `authSlice.ts`) when you have complex **client-side only state** that must be shared globally across multiple components (e.g., a dark mode toggle, or a multi-step form wizard).

For 99% of new features (Users, Subscriptions, Notifications), you will only need an `Api.ts` file, and **not** a `Slice.ts` file!

---

## 🗺️ PART 3 — WHERE TO CHANGE WHAT (Quick Reference)

| Task | File(s) to Change |
|---|---|
| Add a new **page** | Create `src/app/.../page.tsx` |
| Add a new **layout** | Create `src/app/.../layout.tsx` |
| Add **auth protection** | Edit `src/middleware.ts` — uncomment the token check logic |
| Add a new **API endpoint** | Create `src/redux/features/[feature]/[feature]Api.ts` |
| Add new **client state** | Create `src/redux/features/[feature]/[feature]Slice.ts`, register in `rootReducer.ts` |
| Persist new state in localStorage | Add key to `whitelist` in `store.ts` persistConfig |
| Change **API base URL** | `.env` file (`NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_DEV_BASE_URL`) |
| Add a new **font** | `src/fonts/Fonts.tsx` + `layout.tsx` body className |
| Add a new **sidebar link** | `src/components/dashboardLayout/AppSidebar.tsx` |
| Change **global styles** | `src/app/globals.css` |
| Show a **confirm/delete dialog** | `import showDeleteModal from "@/components/common/DeleteModal"` |

---

## 📋 PART 4 — BUILDING A FEATURE END-TO-END

### Example: The "Users" section in the Admin Dashboard

**Step 1: The RTK Query API**

```
src/redux/api/
├── userApi.ts     ← Contains getUserList, getUserById, deleteUser, etc.
```

**Step 2: The Pages**

```
src/app/(dashboardLayout)/dashboard/admin/users/
├── page.tsx           ← /dashboard/admin/users  (List view)
```

**Step 3: The Components**

```
src/components/
├── ... (Tables, Cards, etc.)
```

**Step 4: The Sidebar Link**

In `AppSidebar.tsx`, the admin navigation connects to `/dashboard/admin/users`.

**Step 5: Connecting everything in the page**

```tsx
// src/app/(dashboardLayout)/dashboard/admin/users/page.tsx
"use client"; 
import { useGetUserListQuery } from "@/redux/api/userApi";

export default function UsersPage() {
  // We use the exact hook generated by userApi.ts
  const { data, isLoading, isError } = useGetUserListQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users</div>;

  const users = data?.data?.data || [];

  return (
    <div>
      <h1>User Management</h1>
      {users.map(user => <div key={user.id}>{user.fullName}</div>)}
    </div>
  );
}
```

---

## ⚡ Key Patterns to Remember

### Pattern 1: Custom Typed Hooks

This file already exists at `src/hooks/redux.ts`:

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Usage:

```tsx
const user = useAppSelector(selectCurrentUser); // ← Fully typed, no "as" needed
const dispatch = useAppDispatch();
```

### Pattern 2: Cache Invalidation with Tags

```ts
// In userApi.ts
getUserList: builder.query({
  query: (params) => ({ url: "/users", params }),
  providesTags: ["User"],         // ← This query provides "User" data
}),
deleteUser: builder.mutation({
  query: (id) => ({ url: `/users/delete/${id}`, method: "DELETE" }),
  invalidatesTags: ["User"],      // ← After delete, auto-refetch getUserList
}),
```

### Pattern 3: Optimistic Updates (Optional but powerful)

If you want the UI to update instantly before the server responds:
```ts
deleteUser: builder.mutation({
  query: (id) => ({ url: `/users/delete/${id}`, method: "DELETE" }),
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    // Immediately update the UI before the server responds
    const patchResult = dispatch(
      userApi.util.updateQueryData("getUserList", {}, (draft) => {
        // Adjust draft logic based on your PaginatedResponse structure
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo(); // Revert if server request fails
    }
  },
}),
```

---

## 🔥 Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Using `useState`/hooks in a Server Component | Add `"use client"` at the top |
| Forgetting `"use client"` on components that use Redux | Add `"use client"` |
| Calling hooks conditionally | Always call hooks at the top level, unconditionally |
| Not registering new slices in `rootReducer.ts` | Always add to `combineReducers({})` |
| Not adding `tagTypes` to `baseApi.ts` | Add all tags to the `tagTypes: []` array |
| Mutating state outside of a slice reducer | Only mutate state inside `createSlice` reducers |
| Using `fetch()` directly when RTK Query is available | Use RTK Query endpoints for all API calls |
| Using plain `useDispatch`/`useSelector` | Use `useAppDispatch`/`useAppSelector` from `@/hooks/redux` for full type safety |

---

## 🔌 PART 5 — REAL-TIME WEBSOCKETS

This project includes a robust WebSocket implementation for real-time features like chat and notifications.

### Concept 12: `useWebSocket` hook and `WebSocketProvider`

The WebSocket connection is globally provided so any component can access the real-time state.

**1. The Provider (`src/components/providers/WebSocketProvider.tsx`)**
This component wraps your application and initializes the WebSocket connection automatically when a user logs in (using their Redux token).

**2. The Hook (`src/hooks/useWebSocket.ts`)**
It manages:
- Connection state (`isConnected`)
- Incoming messages and chat history (`messages`)
- Online users (`onlineUsers`)
- Unread notifications/messages count (`unreadCount`)
- Auto-reconnection logic

**Usage in a Component:**

```tsx
"use client";
import { useWS } from "@/components/providers/WebSocketProvider";

export function ChatBox() {
  const { messages, sendMessage, isConnected } = useWS();

  const handleSend = () => {
    sendMessage("receiver-id-here", "Hello there!");
  };

  return (
    <div>
      <p>Status: {isConnected ? "🟢 Online" : "🔴 Offline"}</p>
      {messages.map((msg, i) => <div key={i}>{msg.message}</div>)}
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
```

---

## 🚀 Getting Started

```powershell
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |

### Environment Variables

Copy `.env` and fill in your values:

```text
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_PORT=5000
NEXT_PUBLIC_BASE_URL=https://api.yourproductiondomain.com/api
NEXT_PUBLIC_DEV_BASE_URL=http://localhost:5000/api
```

---

## Author

**Md. Rakibul Islam** — Junior Frontend Developer

## License

MIT — see `LICENSE` for details.
