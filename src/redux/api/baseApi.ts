import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store";

// Select the correct base URL based on the environment.
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_DEV_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  // Use fallback if not set yet in development
  console.warn(
    "API base URL is not configured. Set NEXT_PUBLIC_DEV_BASE_URL or NEXT_PUBLIC_BASE_URL in your .env file."
  );
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

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
