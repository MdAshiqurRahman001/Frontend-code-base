import baseApi from "@/redux/api/baseApi";
import { ApiResponse, ChatContact, ChatMessage } from "@/types";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /chat/conversations — Get all active conversation threads
    getConversations: builder.query<ApiResponse<ChatContact[]>, void>({
      query: () => "/chat/conversations",
      providesTags: ["Chat"],
    }),

    // GET /chat/conversations/:id/messages — Get message stream for a contact
    getMessages: builder.query<ApiResponse<ChatMessage[]>, string>({
      query: (contactId) => `/chat/conversations/${contactId}/messages`,
      providesTags: (_result, _error, contactId) => [{ type: "Chat", id: contactId }],
    }),

    // POST /chat/messages/send — Send a direct message
    sendMessage: builder.mutation<
      ApiResponse<ChatMessage>,
      { receiverId: string; text: string; imageUrl?: string }
    >({
      query: (body) => ({
        url: "/chat/messages/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),

    // PATCH /chat/conversations/:id/read — Mark conversation as read
    markConversationRead: builder.mutation<ApiResponse<null>, string>({
      query: (contactId) => ({
        url: `/chat/conversations/${contactId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkConversationReadMutation,
} = chatApi;

export default chatApi;
