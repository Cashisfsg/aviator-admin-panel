import { adminApi } from "@/app/providers/redux-provider";

import type { Requisite, AddRequisiteRequest } from "./types";

const requisiteApi = adminApi.injectEndpoints({
    endpoints: builder => ({
        fetchAllRequisites: builder.query<Requisite[], void>({
            query: () => "/admin/requisites",
            providesTags: ["Requisite"]
        }),
        addNewRequisite: builder.mutation<Requisite, AddRequisiteRequest>({
            query: body => ({
                url: "/admin/requisites",
                method: "POST",
                body
            }),
            invalidatesTags: ["Requisite"]
        })
    })
});

export const {
    useFetchAllRequisitesQuery,
    useLazyFetchAllRequisitesQuery,
    useAddNewRequisiteMutation
} = requisiteApi;
