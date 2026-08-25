import baseApi from "@/redux/api/baseApi";
import { ApiResponse, AppNotification, PaginatedResponse } from "@/types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /notifications/all-noti — admin: all notifications
    getAllNotifications: builder.query<
      ApiResponse<PaginatedResponse<AppNotification>>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({ url: "/notifications/all-noti", params }),
      providesTags: ["Notification"],
    }),

    // GET /notifications/get-noti — get my notifications
    getMyNotifications: builder.query<
      ApiResponse<PaginatedResponse<AppNotification>>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({ url: "/notifications/get-noti", params }),
      providesTags: ["Notification"],
    }),

    // GET /notifications/unread-noti — get unread count
    getUnreadNotifications: builder.query<
      ApiResponse<AppNotification[]>,
      void
    >({
      query: () => "/notifications/unread-noti",
      providesTags: ["Notification"],
    }),

    // PATCH /notifications/read-noti — mark all as read
    markNotificationsRead: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/notifications/read-noti",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // POST /notifications/send-noti — send to specific user
    sendNotification: builder.mutation<
      ApiResponse<AppNotification>,
      { userId: string; title: string; body: string; data?: string }
    >({
      query: (body) => ({
        url: "/notifications/send-noti",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    // POST /notifications/send-group-noti — admin broadcast
    sendGroupNotification: builder.mutation<
      ApiResponse<null>,
      { title: string; body: string; role?: string; data?: string }
    >({
      query: (body) => ({
        url: "/notifications/send-group-noti",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    // DELETE /notifications/delete-noti/:id
    deleteNotification: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/notifications/delete-noti/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllNotificationsQuery,
  useGetMyNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkNotificationsReadMutation,
  useSendNotificationMutation,
  useSendGroupNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
