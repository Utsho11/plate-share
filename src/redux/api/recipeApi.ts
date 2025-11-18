import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRecipe: build.mutation({
      query: (data) => ({
        url: "/recipe/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.recipies],
    }),
  }),
});

export const { useCreateRecipeMutation } = recipeApi;
