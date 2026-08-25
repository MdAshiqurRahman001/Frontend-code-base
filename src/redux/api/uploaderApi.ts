import baseApi from "./baseApi";

export const uploaderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{ success: boolean; data: string[]; message?: string }, FormData>({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploaderApi;
