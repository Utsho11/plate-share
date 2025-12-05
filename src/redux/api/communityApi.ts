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
      query: () => ({
        url: `/community/get-all`,
        method: "GET",
      }),
      providesTags: [tagTypes.communities],
    }),
    
    getAllMyCommunities: build.query({
      query: () => ({
        url: `/community/get-my-communities`,
        method: "GET",
      }),
      providesTags: [tagTypes.communities],
    }),

    leaveCommunity: build.mutation({
      query: (id) => ({
        url: `/community/leave-community`,
        method: "DELETE",
        data: { c_id: id },
      }),
      invalidatesTags: [tagTypes.communities],
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

export const {
  useCreateCommunityMutation,
  useGetAllCommunitiesQuery,
  useLeaveCommunityMutation,useGetAllMyCommunitiesQuery
} = communityApi;
