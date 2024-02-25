import { adminApi } from "@/app/providers/redux-provider";

import type { User } from "./types";

export const userApi = adminApi
    .enhanceEndpoints({
        addTagTypes: ["User"]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchUserInfo: builder.query<User, void>({
                query: () => "/admin",
                providesTags: (result, error) =>
                    result
                        ? ["User"]
                        : error?.status === 401
                          ? ["Unauthorized"]
                          : ["User"]
            })
        })
    });

export const { useFetchUserInfoQuery, useLazyFetchUserInfoQuery } = userApi;
