import { adminApi } from "@/app/providers/redux-provider";

import type { FetchAllWithdrawalsRequest, Withdrawal } from "./types";

const withdrawalApi = adminApi.injectEndpoints({
    endpoints: builder => ({
        fetchAllWithdrawals: builder.query<
            Withdrawal[],
            FetchAllWithdrawalsRequest
        >({
            query: params => ({ url: "/admin/withdrawals", params })
        }),
        confirmWithdrawalById: builder.mutation<
            { message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/withdrawals/${id}`,
                method: "PUT"
            })
        }),
        cancelWithdrawalById: builder.mutation<
            { message: string },
            { id: string; statusMessage: string }
        >({
            query: ({ id, statusMessage }) => ({
                url: `/admin/withdrawals/${id}/cancel`,
                method: "PUT",
                body: { statusMessage }
            })
        })
    })
});

export const {
    useFetchAllWithdrawalsQuery,
    useLazyFetchAllWithdrawalsQuery,
    useConfirmWithdrawalByIdMutation,
    useCancelWithdrawalByIdMutation
} = withdrawalApi;
