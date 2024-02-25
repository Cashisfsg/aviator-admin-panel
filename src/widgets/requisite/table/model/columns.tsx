import { ColumnDef } from "@tanstack/react-table";

import { formatDate, formatTime } from "@/shared/lib";
import { Requisite } from "@/entities/requisite";
import { Switch } from "@/shared/ui/switch/switch";

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
        accessorFn: row => `Количество выполненных заявок: 0 
        Выполнено: 0 ${row.currency}
        В процессе: 0 ${row.currency}
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
        cell: cell => <Switch aria-checked={cell.row.original.active} />
    }
];
