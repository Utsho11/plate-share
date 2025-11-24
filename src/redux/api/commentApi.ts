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

    // getAllRecipe: build.query({
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   query: (args: Record<string, any>) => ({
    //     url: "/recipe",
    //     method: "GET",
    //     params: args,
    //   }),
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   transformResponse: (response: any, meta: any) => {
    //     return {
    //       recipies: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.recipies],
    // }),

    // getRecipeById: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/recipe/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.recipies],
    // }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
