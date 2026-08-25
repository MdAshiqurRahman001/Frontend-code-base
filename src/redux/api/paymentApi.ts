import baseApi from "@/redux/api/baseApi";
import { ApiResponse, PaginatedResponse, PaymentTransaction } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /payments/transactions — Get all payment transactions
    getTransactions: builder.query<
      ApiResponse<PaginatedResponse<PaymentTransaction> | PaymentTransaction[]>,
      { page?: number; limit?: number; status?: string; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/payments/transactions",
        params: params || undefined,
      }),
      providesTags: ["Payment"],
    }),

    // GET /payments/transactions/:id — Get single transaction details
    getTransactionById: builder.query<ApiResponse<PaymentTransaction>, string>({
      query: (id) => `/payments/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Payment", id }],
    }),

    // POST /payments/create-intent — Create payment session or Stripe intent
    createPaymentIntent: builder.mutation<
      ApiResponse<{ clientSecret?: string; paymentUrl?: string; orderId?: string }>,
      { amount: number; planId?: string | number; currency?: string }
    >({
      query: (body) => ({
        url: "/payments/create-intent",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreatePaymentIntentMutation,
} = paymentApi;

export default paymentApi;
