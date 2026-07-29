import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const followerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation({
      query: (data) => ({
        url: "/followers/follow",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.followers, tagTypes.users],
    }),
    unfollowUser: build.mutation({
      query: (data) => ({
        url: "/followers/unfollow",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.followers, tagTypes.users],
    }),
    getMyFollowers: build.query({
      query: () => ({
        url: "/followers/my-followers",
        method: "GET",
      }),
      providesTags: [tagTypes.followers],
    }),
    getMyFollowing: build.query({
      query: () => ({
        url: "/followers/my-following",
        method: "GET",
      }),
      providesTags: [tagTypes.followers],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetMyFollowersQuery,
  useGetMyFollowingQuery,
} = followerApi;
