import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformStats: build.query({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      providesTags: [tagTypes.stats],
    }),
  }),
});

export const { useGetPlatformStatsQuery } = statsApi;
