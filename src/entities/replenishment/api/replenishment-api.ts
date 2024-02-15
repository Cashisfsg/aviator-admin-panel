import { adminApi } from "@/app/providers/redux-provider";

import type {
    Replenishment,
    ConfirmReplenishmentRequest,
    CancelReplenishmentRequest,
    SuccessResponse
} from "./types";

const replenishmentApi = adminApi.injectEndpoints({
    endpoints: builder => ({
        fetchAllReplenishments: builder.query<Replenishment[], void>({
            query: () => "/admin/replenishments"
        }),
        confirmReplenishmentById: builder.mutation<
            SuccessResponse,
            ConfirmReplenishmentRequest
        >({
            query: ({ id }) => ({
                url: `/admin/replenishments/${id}`,
                method: "PUT"
            })
        }),
        cancelReplenishmentById: builder.mutation<
            SuccessResponse,
            CancelReplenishmentRequest
        >({
            query: ({ id, statusMessage }) => ({
                url: `/admin/replenishments/${id}/cancel`,
                method: "PUT",
                body: { statusMessage }
            })
        })
    })
});

export const {
    useFetchAllReplenishmentsQuery,
    useLazyFetchAllReplenishmentsQuery,
    useConfirmReplenishmentByIdMutation,
    useCancelReplenishmentByIdMutation
} = replenishmentApi;
