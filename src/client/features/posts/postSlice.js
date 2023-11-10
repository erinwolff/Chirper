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
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    // editTask: builder.mutation({
    //   query: (task) => ({
    //     url: `/tasks/${task.id}`,
    //     method: "PUT",
    //     body: task,
    //   }),
    //   invalidatesTags: ["Tasks"],
    // }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  // useGetTaskQuery,
  useCreatePostMutation,
  // useEditTaskMutation,
  useDeletePostMutation,
} = postsApi;