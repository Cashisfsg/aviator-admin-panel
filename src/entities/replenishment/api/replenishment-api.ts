import { adminApi } from "@/app/providers/redux-provider";

import type {
    Replenishment,
    ConfirmReplenishmentRequest,
    CancelReplenishmentRequest,
    SuccessResponse
} from "./types";

const replenishmentApi = adminApi
    .enhanceEndpoints({
        addTagTypes: ["Replenishment"]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllReplenishments: builder.query<Replenishment[], void>({
                query: () => "/admin/replenishments",
                providesTags: (result, error) =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Replenishment" as const,
                                  id: _id as string
                              })),
                              "Replenishment"
                          ]
                        : error?.status === 401
                          ? ["Unauthorized"]
                          : ["Replenishment"]
            }),
            confirmReplenishmentById: builder.mutation<
                SuccessResponse,
                ConfirmReplenishmentRequest
            >({
                query: ({ id }) => ({
                    url: `/admin/replenishments/${id}`,
                    method: "PUT"
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: "Replenishment", id: arg.id }
                ]
            }),
            cancelReplenishmentById: builder.mutation<
                SuccessResponse,
                CancelReplenishmentRequest
            >({
                query: ({ id, statusMessage }) => ({
                    url: `/admin/replenishments/${id}/cancel`,
                    method: "PUT",
                    body: { statusMessage }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: "Replenishment", id: arg.id }
                ]
            })
        })
    });

export const {
    useFetchAllReplenishmentsQuery,
    useLazyFetchAllReplenishmentsQuery,
    useConfirmReplenishmentByIdMutation,
    useCancelReplenishmentByIdMutation
} = replenishmentApi;
