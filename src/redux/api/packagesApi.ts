import baseApi from "@/redux/api/baseApi";
import { ApiResponse, PaginatedResponse, PackagePlan } from "@/types";

export const packagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /packages — Get all packages
    getPackages: builder.query<
      ApiResponse<PaginatedResponse<PackagePlan> | PackagePlan[]>,
      { page?: number; limit?: number; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/packages",
        params: params || undefined,
      }),
      providesTags: ["Package"],
    }),

    // GET /packages/:id — Get package by ID
    getPackageById: builder.query<ApiResponse<PackagePlan>, string | number>({
      query: (id) => `/packages/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Package", id }],
    }),

    // POST /packages — Create new package
    createPackage: builder.mutation<ApiResponse<PackagePlan>, Partial<PackagePlan>>({
      query: (body) => ({
        url: "/packages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Package"],
    }),

    // PUT /packages/:id — Update package
    updatePackage: builder.mutation<ApiResponse<PackagePlan>, { id: string | number; body: Partial<PackagePlan> }>({
      query: ({ id, body }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Package"],
    }),

    // DELETE /packages/:id — Delete package
    deletePackage: builder.mutation<ApiResponse<{ message: string }>, string | number>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesApi;

export default packagesApi;
