import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Select the correct base URL based on the environment.
// Falls back to DEV_BASE_URL if NEXT_PUBLIC_ENV is not set.
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_DEV_BASE_URL;

if (!baseUrl) {
  throw new Error(
    "API base URL is not configured. " +
      "Set NEXT_PUBLIC_DEV_BASE_URL (and NEXT_PUBLIC_BASE_URL for production) in your .env file."
  );
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});

export default baseApi;
