import api from "../../store/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    // getTask: builder.query({
    //   query: (id) => `/tasks/${id}`,
    //   providesTags: ["Tasks"],
    // }),
    // createTask: builder.mutation({
    //   query: (task) => ({
    //     url: "/tasks",
    //     method: "POST",
    //     body: task,
    //   }),
    //   invalidatesTags: ["Tasks"],
    // }),
    // editTask: builder.mutation({
    //   query: (task) => ({
    //     url: `/tasks/${task.id}`,
    //     method: "PUT",
    //     body: task,
    //   }),
    //   invalidatesTags: ["Tasks"],
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Tasks"],
    // }),
  }),
});

export const {
  useGetPostsQuery,
  // useGetTaskQuery,
  // useCreateTaskMutation,
  // useEditTaskMutation,
  // useDeleteTaskMutation,
} = postsApi;