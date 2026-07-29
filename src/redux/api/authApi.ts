import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        data,
      }),
    }),
    // resetPassword: build.mutation({
    //   query: (data) => ({
    //     url: "/auth/reset-password",
    //     method: "POST",
    //     data,
    //   }),
    // }),
    resetPassword: build.mutation({
      query: ({ token, ...data }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data, // not body
        headers: {
          Authorization: token,
        },
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    subscribeUser: build.mutation({
      query: (data) => ({
        url: "/auth/subscribe",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useSubscribeUserMutation,
} = authApi;
