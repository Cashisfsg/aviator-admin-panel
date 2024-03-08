import { ColumnDef } from "@tanstack/react-table";
import { Deposit } from "@/entities/balance";

export const columns: ColumnDef<Deposit>[] = [
    {
        id: "date",
        header: "Дата",
        accessorKey: "createdAt"
    },
    {
        id: "amount",
        header: "Сумма пополнения",
        accessorKey: "balance"
    },
    {
        id: "link",
        header: "Ссылка на транзакцию",
        accessorKey: "link"
    }
];
