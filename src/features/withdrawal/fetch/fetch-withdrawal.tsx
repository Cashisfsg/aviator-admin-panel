import { Cell } from "@tanstack/react-table";

import { useFetchAllWithdrawalsQuery, Withdrawal } from "@/entities/withdrawal";
import { WithdrawalTable } from "@/entities/withdrawal";

import { Dialog } from "@/shared/ui/dialog";
import { formatDate, formatTime } from "@/shared/lib";

import ConfirmIcon from "@/assets/ok.webp";

const columns = [
    {
        id: "id",
        header: "ID заявки",
        accessorFn: (row: Withdrawal) => `#${row._id}`
    },
    {
        id: "amount",
        header: "Сумма",
        accessorFn: (row: Withdrawal) => row.amount.toFixed(2)
    },
    {
        id: "income",
        header: "Вы получите",
        accessorKey: ""
    },
    {
        id: "requisite",
        header: "Реквизиты",
        accessorKey: "userRequisite"
    },
    {
        id: "status",
        header: "Статус",
        accessorKey: "status"
    },
    {
        id: "status_message",
        header: "Причина",
        accessorKey: "statusMessage"
    },
    {
        id: "date",
        header: "Дата",
        accessorFn: (row: Withdrawal) =>
            `Создано: ${formatDate(
                row.createdAt
            )} ${formatTime(row.createdAt, "%H:%M:%S")}
        Выполнено: ${formatDate(
            row.createdAt
        )} ${formatTime(row.createdAt, "%H:%M:%S")}`
    },
    //     {
    //         id: "created_at",
    //         header: "Дата создания",
    //         accessorFn: (row: Withdrawal) => `${formatDate(
    //             row.createdAt
    //         )} ${formatTime(row.createdAt, "%H:%M:%S")}
    //    `
    //     },
    //     {
    //         id: "completed_at",
    //         header: "Дата выполнения",
    //         accessorFn: (row: Withdrawal) =>
    //             row.completedDate
    //                 ? `${formatDate(
    //                       row.completedDate
    //                   )} ${formatTime(row.completedDate, "%H:%M:%S")}`
    //                 : ""
    //     },
    {
        id: "action",
        header: "Действия",
        cell: (cell: Cell<Withdrawal, unknown>) => {
            console.log(cell.row.original);

            return (
                <Dialog.Trigger>
                    <img
                        src={ConfirmIcon}
                        alt="Подтвердить"
                        className="h-4 w-4"
                    />
                    <span className="sr-only">Подтвердить заявку</span>
                </Dialog.Trigger>
            );
        }
    }
];

export const FetchWithdrawal = () => {
    const { data, isSuccess, isError, isLoading, error } =
        useFetchAllWithdrawalsQuery({});

    if (isLoading) return <pre>Loading...</pre>;

    if (isError) return <pre>{error?.data?.message}</pre>;

    if (isSuccess)
        return (
            <WithdrawalTable
                data={data}
                columns={columns}
            />
        );
};
