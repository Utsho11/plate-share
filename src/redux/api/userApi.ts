import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/users",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.users],
    }),
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    updateUserStatusRole: build.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/status-role`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useUpdateUserStatusRoleMutation,
} = userApi;
