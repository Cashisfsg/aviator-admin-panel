import { ColumnDef } from "@tanstack/react-table";

import { Replenishment } from "@/entities/replenishment";
import { formatDate, formatTime } from "@/shared/lib";

import ConfirmIcon from "@/assets/ok.webp";

export const columns: ColumnDef<Replenishment>[] = [
    {
        id: "id",
        header: "ID заявки",
        // footer: props => props.column.id,

        accessorFn: row => `#${row._id}`
    },
    {
        id: "amount",
        header: "Сумма",
        footer: props => props.column.id,

        accessorFn: row => row.amount["RUB"].toFixed(2)
    },
    {
        id: "debit",
        header: "Сумма списания",
        footer: props => props.column.id,
        accessorFn: row => row.deduction["RUB"].toFixed(2)
    },
    {
        id: "status",
        header: "Статус",
        accessorKey: "status"
    },
    {
        id: "reason",
        header: "Причина отмены",
        accessorKey: "statusMessage"
    },
    {
        id: "requisite",
        header: "Реквизиты",
        footer: props => props.column.id,
        accessorFn: row => `*${row?.requisite?.requisite?.slice(-4)}`
    },
    {
        id: "date",
        header: "Дата",
        accessorFn: row =>
            `Создано: ${formatDate(
                row.createdAt
            )} ${formatTime(row.createdAt, "%H:%M:%S")}
            ${
                row.completedDate
                    ? `Выполнено: ${formatDate(
                          row.createdAt
                      )} ${formatTime(row.createdAt, "%H:%M:%S")}`
                    : ""
            }`
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
    // {
    //     // id: "date",
    //     header: "Дата",
    //     columns: [
    //         {
    //             id: "created_at",
    //             header: "Создано",

    //             footer: props => props.column.id,
    //             accessorFn: row =>
    //                 `${formatDate(
    //                     row.createdAt
    //                 )} ${formatTime(row.createdAt, "%H:%M:%S")}`
    //         },
    //         {
    //             id: "completed_at",
    //             header: "Выполнено",
    //             footer: props => props.column.id,

    //             accessorFn: row =>
    //                 row.completedDate
    //                     ? `${formatDate(
    //                           row.completedDate
    //                       )} ${formatTime(row.completedDate, "%H:%M:%S")}`
    //                     : ""
    //         }
    //     ]
    //     // accessorFn: row =>
    //     //     `Создано: ${formatDate(
    //     //         row.createdAt
    //     //     )} ${formatTime(row.createdAt, "%H:%M:%S")}
    //     //     Выполнено: ${formatDate(
    //     //         row.createdAt
    //     //     )} ${formatTime(row.createdAt, "%H:%M:%S")}`
    // },
    {
        id: "actions",
        header: "Действия",
        footer: props => props.column.id,

        cell: cell => {
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
