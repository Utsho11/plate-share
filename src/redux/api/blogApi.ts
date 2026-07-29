import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    getAllBlogs: build.query({
      query: (args: Record<string, unknown> = {}) => ({
        url: "/blog",
        method: "GET",
        params: args,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
      },
      providesTags: [tagTypes.blogs],
    }),

    getBlogById: build.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      providesTags: [tagTypes.blogs],
    }),

    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `/blog/update/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    deleteBlog: build.mutation({
      query: (id: string) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
