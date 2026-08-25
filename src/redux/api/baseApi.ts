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

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setRefreshToken, setToken } from "../features/auth/authSlice";
import { RootState } from "../store";
import { Mutex } from "@/lib/mutex";
import Cookies from "js-cookie";

// Read API URL from environment variables, with a fallback for local development
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_DEV_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

// Concurrency mutex to prevent multiple parallel refresh token calls
const mutex = new Mutex();

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

/**
 * Enhanced Base Query with Automatic Re-Authentication (Refresh Token).
 * - Intercepts 401 Unauthorized responses.
 * - Locks subsequent requests with Mutex to avoid multiple refresh calls.
 * - Hits the refresh endpoint and updates Redux state & Cookies.
 * - Retries the original request with the fresh access token.
 * - Logs out and cleans up if refresh fails.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if another request is currently refreshing the token
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  // Check if endpoint is login/refresh itself to avoid infinite loop
  const endpointUrl = typeof args === "string" ? args : args.url;
  const isAuthEndpoint =
    endpointUrl.includes("/auth/login") ||
    endpointUrl.includes("/auth/refresh") ||
    endpointUrl.includes("/auth/refresh-token");

  if (result.error && result.error.status === 401 && !isAuthEndpoint) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const state = api.getState() as RootState;
        const currentRefreshToken = state?.auth?.refreshToken;

        // Call backend refresh token endpoint
        // Sends credentials (for httpOnly cookie) AND refreshToken in body if available
        const refreshResult = await rawBaseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: currentRefreshToken ? { refreshToken: currentRefreshToken } : {},
          },
          api,
          extraOptions
        );

        const data = refreshResult.data as
          | {
              data?: {
                token?: string;
                accessToken?: string;
                refreshToken?: string;
              };
              token?: string;
              accessToken?: string;
              refreshToken?: string;
              Token?: string;
            }
          | undefined;

        const newAccessToken =
          data?.data?.accessToken ||
          data?.data?.token ||
          data?.accessToken ||
          data?.token ||
          data?.Token;

        const newRefreshToken =
          data?.data?.refreshToken || data?.refreshToken;

        if (newAccessToken) {
          // Store new access token in Redux
          api.dispatch(setToken(newAccessToken));

          // Store new refresh token if provided in response
          if (newRefreshToken) {
            api.dispatch(setRefreshToken(newRefreshToken));
          }

          // Sync with browser cookies for client/middleware persistence
          Cookies.set("auth-token", newAccessToken, { sameSite: "lax" });
          if (newRefreshToken) {
            Cookies.set("refresh-token", newRefreshToken, { sameSite: "lax" });
          }

          // Retry the initial query with the fresh access token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          // Refresh token invalid or expired -> logout user
          api.dispatch(logout());
          Cookies.remove("auth-token");
          Cookies.remove("refresh-token");
        }
      } catch {
        api.dispatch(logout());
        Cookies.remove("auth-token");
        Cookies.remove("refresh-token");
      } finally {
        // Always release the lock
        release();
      }
    } else {
      // If mutex was already locked, wait until refresh finishes and retry
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
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
