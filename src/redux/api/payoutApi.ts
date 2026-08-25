import baseApi from "@/redux/api/baseApi";
import { ApiResponse, PaginatedResponse, PayoutRequest } from "@/types";

export const payoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /payouts — Get creator payouts queue
    getPayouts: builder.query<
      ApiResponse<PaginatedResponse<PayoutRequest> | PayoutRequest[]>,
      { page?: number; limit?: number; status?: string; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/payouts",
        params: params || undefined,
      }),
      providesTags: ["Payout"],
    }),

    // POST /payouts/:id/approve — Approve creator payout
    approvePayout: builder.mutation<ApiResponse<PayoutRequest>, string | number>({
      query: (id) => ({
        url: `/payouts/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Payout", "Payment"],
    }),

    // POST /payouts/:id/reject — Reject creator payout
    rejectPayout: builder.mutation<ApiResponse<{ message: string }>, { id: string | number; reason?: string }>({
      query: ({ id, reason }) => ({
        url: `/payouts/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Payout"],
    }),

    // POST /payouts/request — Creator requests withdrawal
    requestPayout: builder.mutation<ApiResponse<PayoutRequest>, { amount: number; bankName: string; accountNumber: string }>({
      query: (body) => ({
        url: "/payouts/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payout"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPayoutsQuery,
  useApprovePayoutMutation,
  useRejectPayoutMutation,
  useRequestPayoutMutation,
} = payoutApi;

export default payoutApi;
