import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const ratingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRating: build.mutation({
      query: (data) => ({
        url: "/rating/create-rating",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ratings, tagTypes.recipies],
    }),
    getRecipeRatings: build.query({
      query: (recipeId: string) => ({
        url: `/rating/${recipeId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ratings],
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetRecipeRatingsQuery,
} = ratingApi;
