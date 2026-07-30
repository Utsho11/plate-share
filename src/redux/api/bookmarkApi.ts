import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    toggleBookmark: build.mutation({
      query: (recipeId: string) => ({
        url: `/bookmark/toggle/${recipeId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.bookmarks, tagTypes.recipies],
    }),

    getMyBookmarks: build.query({
      query: () => ({
        url: "/bookmark/my-bookmarks",
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
      },
      providesTags: [tagTypes.bookmarks],
    }),

    getUserBookmarkIds: build.query({
      query: () => ({
        url: "/bookmark/my-bookmark-ids",
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
      },
      providesTags: [tagTypes.bookmarks],
    }),
  }),
});

export const {
  useToggleBookmarkMutation,
  useGetMyBookmarksQuery,
  useGetUserBookmarkIdsQuery,
} = bookmarkApi;
