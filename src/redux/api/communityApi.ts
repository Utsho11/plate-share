import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const communityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCommunity: build.mutation({
      query: (data) => ({
        url: "/community/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.communities],
    }),

    getAllCommunities: build.query({
      query: (id) => ({
        url: `/community/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.communities],
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

export const { useCreateCommunityMutation, useGetAllCommunitiesQuery } =
  communityApi;
