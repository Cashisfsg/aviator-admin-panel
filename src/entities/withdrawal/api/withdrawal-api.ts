import { adminApi } from "@/app/providers/redux-provider";

import type { FetchAllWithdrawalsRequest, Withdrawal } from "./types";

export const withdrawalApi = adminApi
    .enhanceEndpoints({
        addTagTypes: ["Withdrawal"]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllWithdrawals: builder.query<
                Withdrawal[],
                FetchAllWithdrawalsRequest | void
            >({
                query: params => ({
                    url: "/admin/withdrawals",
                    params: params || undefined
                }),
                providesTags: (result, error) =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Withdrawal" as const,
                                  id: _id as string
                              })),
                              "Withdrawal"
                          ]
                        : error?.status === 401
                          ? ["Unauthorized"]
                          : ["Withdrawal"]
            }),
            confirmWithdrawalById: builder.mutation<
                { message: string },
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/withdrawals/${id}`,
                    method: "PUT"
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: "Withdrawal", id: arg.id }
                ]
            }),
            activateWithdrawalById: builder.mutation<
                { message: string },
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/withdrawals/${id}/activate`,
                    method: "PUT"
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: "Withdrawal", id: arg.id }
                ]
            }),
            cancelWithdrawalById: builder.mutation<
                { message: string },
                { id: string; statusMessage: string }
            >({
                query: ({ id, statusMessage }) => ({
                    url: `/admin/withdrawals/${id}/cancel`,
                    method: "PUT",
                    body: { statusMessage }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: "Withdrawal", id: arg.id }
                ]
            })
        })
    });

export const {
    useFetchAllWithdrawalsQuery,
    useLazyFetchAllWithdrawalsQuery,
    useConfirmWithdrawalByIdMutation,
    useActivateWithdrawalByIdMutation,
    useCancelWithdrawalByIdMutation
} = withdrawalApi;
