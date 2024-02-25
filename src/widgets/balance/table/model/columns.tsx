import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
    {
        id: "date",
        header: "Дата",
        accessorKey: "date"
    },
    {
        id: "amount",
        header: "Сумма пополнения",
        accessorKey: "amount"
    },
    {
        id: "link",
        header: "Ссылка на транзакцию",
        accessorKey: "link"
    }
];
