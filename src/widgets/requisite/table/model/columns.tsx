import { ColumnDef } from "@tanstack/react-table";

import { formatDate, formatTime } from "@/shared/lib";
import { Requisite } from "@/entities/requisite";
import { SwitchRequisiteStatus } from "@/features/requisite/toggle";

export const columns: ColumnDef<Requisite>[] = [
    {
        id: "requisite",
        header: "Реквизиты",
        accessorKey: "requisite"
    },
    {
        id: "status",
        header: "Статус",
        accessorFn: row => (row.active ? "Активный" : "Неактивный")
    },
    {
        id: "cash_flow",
        header: "Оборот",
        accessorFn:
            row => `Количество выполненных заявок: ${row.turnover.confirmedCount} 
        Выполнено: ${row.turnover.confirmed} ${row.currency}
        В процессе: ${row.turnover.inProcess} ${row.currency}
        `
    },
    {
        id: "created_at",
        header: "Дата создания",
        cell: cell => {
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
        cell: cell => {
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
    },
    {
        id: "action",
        header: "ВКЛ./ВЫКЛ.",
        cell: cell => (
            <SwitchRequisiteStatus
                requisiteId={cell.row.original._id}
                aria-checked={cell.row.original.active}
            />
        )
    }
];
