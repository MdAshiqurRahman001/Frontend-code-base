/**
 * ==============================================================================
 * 📌 BASE API SERVICE (src/redux/api/baseApi.ts)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This is the central RTK Query API service. All other API endpoints (authApi, userApi, etc.)
 * inject their endpoints into this base API.
 *
 * ⚙️ HOW IT WORKS:
 *  1. `rawBaseQuery`: Automatically attaches the JWT Bearer token to every HTTP request.
 *  2. `baseQueryWithAuth`: Automatically logs out the user if the server returns 401/403.
 *  3. `tagTypes`: Enables automatic cache invalidation (refetches data when mutations succeed).
 *
 * 🛠️ HOW TO CONNECT YOUR BACKEND:
 *  - Set `NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1` in your `.env` file!
 * ==============================================================================
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store";

// Read API URL from environment variables, with a fallback for local development
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_DEV_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Automatically retrieve JWT token from Redux auth state
    const state = getState() as RootState;
    const token = state?.auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Wrapper that handles auto-logout on unauthorized responses
const baseQueryWithAuth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: [
    "Auth",
    "User",
    "Notification",
    "Subscription",
    "UserSubscription",
    "Events",
    "Upload",
    "Project",
    "Package",
    "Payment",
    "Payout",
    "Chat",
    "Analytics",
  ],
});

export default baseApi;
