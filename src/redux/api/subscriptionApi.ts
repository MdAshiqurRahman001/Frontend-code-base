import baseApi from "@/redux/api/baseApi";
import {
  ApiResponse,
  PaginatedResponse,
  SubscriptionOffer,
  UserSubscription,
} from "@/types";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Subscription Offers ───────────────────────────────────────────────────

    // GET /subscriptionoffers
    getSubscriptionOffers: builder.query<
      ApiResponse<PaginatedResponse<SubscriptionOffer>>,
      { page?: number; limit?: number; searchTerm?: string; planType?: string }
    >({
      query: (params) => ({ url: "/subscriptionoffers", params }),
      providesTags: ["Subscription"],
    }),

    // GET /subscriptionoffers/get/by/userId
    getMySubscriptionOffer: builder.query<
      ApiResponse<SubscriptionOffer[]>,
      void
    >({
      query: () => "/subscriptionoffers/get/by/userId",
      providesTags: ["Subscription"],
    }),

    // POST /subscriptionoffers — admin only
    createSubscriptionOffer: builder.mutation<
      ApiResponse<SubscriptionOffer>,
      {
        planName: string;
        planType: string;
        price: number;
        duration: number;
        facilities: string[];
        details?: string;
      }
    >({
      query: (body) => ({
        url: "/subscriptionoffers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // PUT /subscriptionoffers/:id — admin only
    updateSubscriptionOffer: builder.mutation<
      ApiResponse<SubscriptionOffer>,
      {
        id: string;
        planName?: string;
        planType?: string;
        price?: number;
        duration?: number;
        facilities?: string[];
        details?: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/subscriptionoffers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // DELETE /subscriptionoffers/:id — admin only
    deleteSubscriptionOffer: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/subscriptionoffers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ── User Subscriptions ────────────────────────────────────────────────────

    // GET /usersubscriptions — admin: all user subscriptions
    getUserSubscriptions: builder.query<
      ApiResponse<PaginatedResponse<UserSubscription>>,
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({ url: "/usersubscriptions", params }),
      providesTags: ["UserSubscription"],
    }),

    // GET /usersubscriptions/get/by/userId — my active subscription
    getMyUserSubscription: builder.query<
      ApiResponse<UserSubscription[]>,
      void
    >({
      query: () => "/usersubscriptions/get/by/userId",
      providesTags: ["UserSubscription"],
    }),

    // POST /usersubscriptions/:id — subscribe to a plan
    createUserSubscription: builder.mutation<
      ApiResponse<UserSubscription>,
      { subscriptionOfferId: string; paymentId: string }
    >({
      query: ({ subscriptionOfferId, paymentId }) => ({
        url: `/usersubscriptions/${subscriptionOfferId}`,
        method: "POST",
        body: { paymentId },
      }),
      invalidatesTags: ["UserSubscription"],
    }),

    // PUT /usersubscriptions/cancel/:id — cancel subscription
    cancelUserSubscription: builder.mutation<ApiResponse<UserSubscription>, string>({
      query: (id) => ({
        url: `/usersubscriptions/cancel/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["UserSubscription"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSubscriptionOffersQuery,
  useGetMySubscriptionOfferQuery,
  useCreateSubscriptionOfferMutation,
  useUpdateSubscriptionOfferMutation,
  useDeleteSubscriptionOfferMutation,
  useGetUserSubscriptionsQuery,
  useGetMyUserSubscriptionQuery,
  useCreateUserSubscriptionMutation,
  useCancelUserSubscriptionMutation,
} = subscriptionApi;
