// import { useFetchAllReplenishmentsQuery } from "@/app";
import { Cell } from "@tanstack/react-table";

import { useAuth } from "@/app/providers/redux-provider";
import {
    useFetchAllReplenishmentsQuery,
    ReplenishmentsTable,
    Replenishment
} from "@/entities/replenishment";

import { formatDate, formatTime } from "@/shared/lib";

import ConfirmIcon from "@/assets/ok.webp";

// export function multiSelectFilter(rows, columnIds, filterValue) {
//     console.log(rows, columnIds, filterValue);
//     return filterValue.length === 0
//         ? rows
//         : rows.filter(row => filterValue.includes(row.original[columnIds]));
// }

const columns = [
    {
        id: "id",
        header: "ID заявки",
        accessorFn: (row: Replenishment) => `#${row._id}`
        // filter: multiSelectFilter
    },
    {
        id: "amount",
        header: "Сумма",
        accessorFn: (row: Replenishment) => row.amount.toFixed(2)
    },
    {
        id: "debit",
        header: "Сумма списания",
        accessorFn: (row: Replenishment) => row.deduction.toFixed(2)
    },
    {
        id: "status",
        header: "Статус",
        accessorKey: "status"
    },
    {
        id: "requisite",
        header: "Реквизиты",
        accessorFn: (row: Replenishment) =>
            `*${row?.requisite?.requisite?.slice(-4)}`
    },
    {
        id: "date",
        header: "Дата",
        accessorFn: (row: Replenishment) =>
            `Создано: ${formatDate(
                row.createdAt
            )} ${formatTime(row.createdAt, "%H:%M:%S")}
            Выполнено: ${formatDate(
                row.createdAt
            )} ${formatTime(row.createdAt, "%H:%M:%S")}`
    },
    // {
    //     id: "created_at",
    //     header: "Дата",
    //     accessorFn: (row: Replenishment) => formatDate(row.createdAt)
    // },
    // {
    //     id: "completed_at",
    //     header: "Дата",
    //     accessorFn: (row: Replenishment) => formatDate(row.completedDate)
    // },
    {
        id: "actions",
        header: "Действия",
        cell: (cell: Cell<Replenishment, unknown>) => {
            console.log(cell.row.original);

            return (
                <button>
                    <img
                        src={ConfirmIcon}
                        alt="Подтвердить"
                        className="h-4 w-4"
                    />
                    <span className="sr-only">Подтвердить заявку</span>
                </button>
            );
        }
    }
];

export const FetchReplenishments = () => {
    const { isAuthenticated } = useAuth();
    const { data, isSuccess, isLoading, isError, error } =
        useFetchAllReplenishmentsQuery(undefined, { skip: !isAuthenticated });

    if (isLoading) return <pre>Loading...</pre>;

    if (isError) return <pre>{error?.data?.message}</pre>;

    if (isSuccess)
        return (
            <ReplenishmentsTable
                data={data}
                columns={columns}
            />
        );

    return <></>;
};
