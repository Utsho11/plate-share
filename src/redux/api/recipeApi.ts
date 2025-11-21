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

    getAllRecipe: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (args: Record<string, any>) => ({
        url: "/recipe",
        method: "GET",
        params: args,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any, meta: any) => {
        return {
          recipies: response,
          meta,
        };
      },
      providesTags: [tagTypes.recipies],
    }),

    getRecipeById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/recipe/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.recipies],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetAllRecipeQuery,
  useGetRecipeByIdQuery,
} = recipeApi;
