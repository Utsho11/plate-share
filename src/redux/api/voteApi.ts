import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const voteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    upVote: build.mutation({
      query: (id) => ({
        url: `/voting/up-vote/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.recipies],
    }),
    downVote: build.mutation({
      query: (id) => ({
        url: `/voting/down-vote/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.recipies],
    }),
  }),
});

export const { useUpVoteMutation, useDownVoteMutation } = voteApi;
