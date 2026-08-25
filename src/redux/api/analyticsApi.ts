import baseApi from "@/redux/api/baseApi";
import { ApiResponse, DashboardOverviewStats, RevenuePoint, PlatformActivity } from "@/types";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /analytics/overview — Overview dashboard statistics
    getDashboardOverview: builder.query<ApiResponse<DashboardOverviewStats>, void>({
      query: () => "/analytics/overview",
      providesTags: ["Analytics"],
    }),

    // GET /analytics/revenue — Revenue time-series data
    getRevenueAnalytics: builder.query<
      ApiResponse<RevenuePoint[]>,
      { timeframe?: "7D" | "30D" | "12M" } | void
    >({
      query: (params) => ({
        url: "/analytics/revenue",
        params: params || undefined,
      }),
      providesTags: ["Analytics"],
    }),

    // GET /analytics/feed — Real-time platform live activity feed
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
