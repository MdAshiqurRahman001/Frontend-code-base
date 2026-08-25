import baseApi from "@/redux/api/baseApi";
import { ApiResponse, PaginatedResponse, RegisterResponse, User } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /users — Register new user
    registerUser: builder.mutation<
      ApiResponse<RegisterResponse>,
      {
        fullName: string;
        email: string;
        password: string;
        phoneNumber?: string;
        role?: string;
        lat?: number;
        lon?: number;
      }
    >({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // GET /users — Get all users (admin)
    getUserList: builder.query<
      ApiResponse<PaginatedResponse<User>>,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        role?: string;
        status?: string;
        isBlocked?: boolean;
        isApproved?: boolean;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),

    // GET /users/:id — Get user by ID
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    // PUT /users/profile — Update own profile (with file upload)
    updateProfile: builder.mutation<ApiResponse<User>, FormData>({
      query: (formData) => ({
        url: "/users/profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // DELETE /users/delete/:id
    deleteUser: builder.mutation<ApiResponse<User>, string>({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // PUT /users/toggle-block/:id
    toggleBlock: builder.mutation<
      ApiResponse<{ action: string; blockedForDays?: number }>,
      { id: string; blockDays?: number }
    >({
      query: ({ id, blockDays }) => ({
        url: `/users/toggle-block/${id}`,
        method: "PUT",
        body: { blockDays },
      }),
      invalidatesTags: ["User"],
    }),

    // PUT /users/approve-users/:id
    approveUser: builder.mutation<ApiResponse<User>, string>({
      query: (id) => ({
        url: `/users/approve-users/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User", "Notification"],
    }),

    // PUT /users/reject-users/:id
    rejectUser: builder.mutation<ApiResponse<User>, string>({
      query: (id) => ({
        url: `/users/reject-users/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    // POST /users/upload-photo
    uploadPhoto: builder.mutation<ApiResponse<string>, FormData>({
      query: (formData) => ({
        url: "/users/upload-photo",
        method: "POST",
        body: formData,
      }),
    }),

    // POST /users/support/message
    sendSupportMessage: builder.mutation<
      ApiResponse<{ message: string }>,
      { name: string; email: string; phone: string; message: string }
    >({
      query: (body) => ({
        url: "/users/support/message",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useGetUserListQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useToggleBlockMutation,
  useApproveUserMutation,
  useRejectUserMutation,
  useUploadPhotoMutation,
  useSendSupportMessageMutation,
} = userApi;
