import baseApi from "@/redux/api/baseApi";
import { ApiResponse, PaginatedResponse, Project, Milestone, Deliverable } from "@/types";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /projects — Get list of projects
    getProjects: builder.query<
      ApiResponse<PaginatedResponse<Project> | Project[]>,
      { page?: number; limit?: number; status?: string; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/projects",
        params: params || undefined,
      }),
      providesTags: ["Project"],
    }),

    // GET /projects/:id — Get project by ID
    getProjectById: builder.query<ApiResponse<Project>, string | number>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),

    // POST /projects — Create new project
    createProject: builder.mutation<ApiResponse<Project>, Partial<Project>>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),

    // PUT /projects/:id/milestones/:milestoneId — Update milestone status
    updateMilestoneStatus: builder.mutation<
      ApiResponse<Milestone>,
      { projectId: string | number; milestoneId: string | number; status: Milestone["status"] }
    >({
      query: ({ projectId, milestoneId, status }) => ({
        url: `/projects/${projectId}/milestones/${milestoneId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Project"],
    }),

    // POST /projects/:id/deliverables — Add deliverable to project
    addDeliverable: builder.mutation<
      ApiResponse<Deliverable>,
      { projectId: string | number; deliverable: Omit<Deliverable, "id"> }
    >({
      query: ({ projectId, deliverable }) => ({
        url: `/projects/${projectId}/deliverables`,
        method: "POST",
        body: deliverable,
      }),
      invalidatesTags: ["Project"],
    }),

    // POST /projects/:id/cancel — Cancel project
    cancelProject: builder.mutation<ApiResponse<{ message: string }>, { projectId: string | number; reason?: string }>({
      query: ({ projectId, reason }) => ({
        url: `/projects/${projectId}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Project"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateMilestoneStatusMutation,
  useAddDeliverableMutation,
  useCancelProjectMutation,
} = projectsApi;

export default projectsApi;
