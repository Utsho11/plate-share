import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (data) => ({
        url: "/comment/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.comments],
    }),

    getAllComments: build.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.comments],
    }),

    // getRecipeById: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/recipe/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.recipies],
    // }),
  }),
});

export const { useCreateCommentMutation, useGetAllCommentsQuery } = commentApi;
