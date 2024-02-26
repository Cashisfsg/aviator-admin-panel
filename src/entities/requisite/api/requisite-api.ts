import { adminApi } from "@/app/providers/redux-provider";

import type {
    Requisite,
    AddRequisiteRequest,
    ToggleRequisiteStatusRequest
} from "./types";

const requisiteApi = adminApi
    .enhanceEndpoints({ addTagTypes: ["Requisite"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllRequisites: builder.query<Requisite[], void>({
                query: () => "/admin/requisites",
                providesTags: result =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Requisite" as const,
                                  id: _id as string
                              })),
                              "Requisite"
                          ]
                        : ["Requisite"]
            }),
            addNewRequisite: builder.mutation<Requisite, AddRequisiteRequest>({
                query: body => ({
                    url: "/admin/requisites",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["Requisite"]
            }),
            toggleRequisiteStatus: builder.mutation<
                Requisite,
                ToggleRequisiteStatusRequest
            >({
                query: ({ id }) => ({
                    url: `/admin/requisites/${id}`,
                    method: "PUT"
                }),

                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        const { data: updatedPost } = await queryFulfilled;
                        dispatch(
                            requisiteApi.util.updateQueryData(
                                "fetchAllRequisites",
                                undefined,
                                draft => {
                                    const index = draft.findIndex(
                                        requisite => requisite._id === id
                                    );
                                    Object.assign(draft[index], updatedPost);
                                }
                            )
                        );
                    } catch {}
                }
            })
        })
    });

export const {
    useFetchAllRequisitesQuery,
    useLazyFetchAllRequisitesQuery,
    useAddNewRequisiteMutation,
    useToggleRequisiteStatusMutation
} = requisiteApi;
