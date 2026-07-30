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
      query: (args: Record<string, any> = {}) => ({
        url: "/recipe",
        method: "GET",
        params: args,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any, meta: any) => {
        const recipies = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        return {
          recipies,
          meta,
        };
      },
      providesTags: [tagTypes.recipies],
    }),

    getMyRecipes: build.query({
      query: () => ({
        url: "/recipe/my-recipes",
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        const recipies = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        return {
          recipies,
        };
      },
      providesTags: [tagTypes.recipies],
    }),

    getRecipesByAuthor: build.query({
      query: (authorId: string) => ({
        url: `/recipe/author/${authorId}`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        const recipies = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        return {
          recipies,
        };
      },
      providesTags: [tagTypes.recipies],
    }),

    getRecipeById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/recipe/${id}`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      providesTags: [tagTypes.recipies],
    }),

    updateRecipe: build.mutation({
      query: ({ id, data }) => ({
        url: `/recipe/update/${id}`,
        method: "PATCH",
        contentType: data instanceof FormData ? "multipart/form-data" : undefined,
        data,
      }),
      invalidatesTags: [tagTypes.recipies],
    }),

    changeRecipeStatus: build.mutation({
      query: ({ id, recipeStatus }) => ({
        url: `/recipe/change-status/${id}`,
        method: "PATCH",
        data: { recipeStatus },
      }),
      invalidatesTags: [tagTypes.recipies],
    }),

    deleteRecipe: build.mutation({
      query: (id: string) => ({
        url: `/recipe/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.recipies],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetAllRecipeQuery,
  useGetMyRecipesQuery,
  useGetRecipesByAuthorQuery,
  useGetRecipeByIdQuery,
  useUpdateRecipeMutation,
  useChangeRecipeStatusMutation,
  useDeleteRecipeMutation,
} = recipeApi;
