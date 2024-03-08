import { adminApi } from "@/app/providers/redux-provider";

import { FetchDepositHistoryResponse } from "./types";

export const balanceApi = adminApi.injectEndpoints({
    endpoints: builder => ({
        fetchDepositHistory: builder.query<FetchDepositHistoryResponse, void>({
            query: () => ({
                url: "/admin/replenishment-history"
            })
        })
    })
});

export const { useFetchDepositHistoryQuery, useLazyFetchDepositHistoryQuery } =
    balanceApi;
