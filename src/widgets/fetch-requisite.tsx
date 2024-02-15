import { Cell } from "@tanstack/react-table";

import {
    useFetchAllRequisitesQuery,
    RequisitesTable,
    Requisite
} from "@/entities/requisite";

import { formatDate, formatTime } from "@/shared/lib";

const columns = [
    {
        id: "requisite",
        header: "Реквизиты",
        accessorKey: "requisite"
    },
    {
        id: "status",
        header: "Статус",
        accessorKey: "status"
    },
    {
        id: "cash_flow",
        header: "Оборот"
    },
    {
        id: "created_at",
        header: "Дата создания",
        cell: (cell: Cell<Requisite, unknown>) => {
            return (
                <>
                    {cell.row.original?.createdAt ? (
                        <time
                            dateTime={cell.row.original?.createdAt}
                        >{`${formatDate(
                            cell.row.original?.createdAt
                        )} ${formatTime(
                            cell.row.original?.createdAt,
                            "%H:%M:%S"
                        )}`}</time>
                    ) : null}
                </>
            );
        }
    },
    {
        id: "updated_at",
        header: "Дата последнего изменения",
        cell: (cell: Cell<Requisite, unknown>) => {
            return (
                <>
                    {cell.row.original?.updatedAt ? (
                        <time
                            dateTime={cell.row.original?.updatedAt}
                        >{`${formatDate(
                            cell.row.original?.updatedAt
                        )} ${formatTime(
                            cell.row.original?.updatedAt,
                            "%H:%M:%S"
                        )}`}</time>
                    ) : null}
                </>
            );
        }
    }
];

export const FetchRequisite = () => {
    const { data, isSuccess, isError, isLoading, error } =
        useFetchAllRequisitesQuery();

    if (isLoading) return <pre>Loading...</pre>;

    if (isError) return <pre>{error?.data?.message}</pre>;

    if (isSuccess)
        return (
            <RequisitesTable
                data={data}
                columns={columns}
            />
        );
};
