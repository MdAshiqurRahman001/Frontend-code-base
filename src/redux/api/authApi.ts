import baseApi from "@/redux/api/baseApi";
import { ApiResponse, LoginResponse, OtpVerifyResponse, User } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /auth/login
    loginUser: builder.mutation<
      ApiResponse<LoginResponse>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // POST /auth/logout
    logoutUser: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // GET /auth/profile
    getMyProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),

    // PUT /auth/change-password
    changePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
    }),

    // POST /auth/forgot-password
    forgotPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/resend-otp
    resendOtp: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/verify-otp
    verifyOtp: builder.mutation<
      ApiResponse<OtpVerifyResponse>,
      { email: string; otp: number }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // POST /auth/reset-password
    resetPassword: builder.mutation<
      ApiResponse<null>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
