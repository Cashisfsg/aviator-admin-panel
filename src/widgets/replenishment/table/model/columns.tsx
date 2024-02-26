import { ColumnDef } from "@tanstack/react-table";

import { Replenishment, Currency } from "@/entities/replenishment";
import { formatDate, formatTime } from "@/shared/lib";

import { ReplenishmentActionButton } from "@/features/replenishment/action";

export const columns = (
    currency: Currency | undefined
): ColumnDef<Replenishment>[] => {
    return [
        {
            id: "id",
            header: "ID заявки",
            // footer: props => props.column.id,

            accessorFn: row => `#${row._id}`
        },
        {
            id: "amount",
            header: currency ? `Сумма, ${currency}` : "Сумма",
            footer: props => props.column.id,
            accessorFn: row => (currency ? row.amount[currency].toFixed(2) : "")
        },
        {
            id: "debit",
            header: "Сумма списания, USDT",
            footer: props => props.column.id,
            accessorFn: row => row.deduction["USDT"].toFixed(2)
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
                          row.completedDate
                      )} ${formatTime(row.completedDate, "%H:%M:%S")}`
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
                return cell.row.original.status.toLowerCase() ===
                    "ожидает оплаты" ? (
                    <ReplenishmentActionButton
                        replenishment={cell.row.original}
                    />
                ) : null;
            }
        }
    ];
};
