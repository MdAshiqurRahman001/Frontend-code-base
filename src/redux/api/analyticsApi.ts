/**
 * ==============================================================================
 * 📌 ANALYTICS API SERVICE (src/redux/api/analyticsApi.ts)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Provides endpoints for fetching dashboard overview metrics, revenue charts,
 * and live activity feeds.
 * ==============================================================================
 */

import baseApi from "@/redux/api/baseApi";
import { ApiResponse, DashboardOverviewStats, RevenuePoint, PlatformActivity } from "@/types";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /analytics/overview — Key Performance Indicators
    getDashboardOverview: builder.query<ApiResponse<DashboardOverviewStats>, void>({
      query: () => "/analytics/overview",
      providesTags: ["Analytics"],
    }),

    // GET /analytics/revenue — Revenue or Growth Time Series Chart
    getRevenueAnalytics: builder.query<ApiResponse<RevenuePoint[]>, void>({
      query: () => "/analytics/revenue",
      providesTags: ["Analytics"],
    }),

    // GET /analytics/feed — Recent user actions & activity
    getPlatformFeed: builder.query<ApiResponse<PlatformActivity[]>, void>({
      query: () => "/analytics/feed",
      providesTags: ["Analytics"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDashboardOverviewQuery,
  useGetRevenueAnalyticsQuery,
  useGetPlatformFeedQuery,
} = analyticsApi;

export default analyticsApi;
