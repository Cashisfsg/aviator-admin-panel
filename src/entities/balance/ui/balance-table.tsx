import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { DynamicTable } from "@/shared/ui";

interface BalanceTableProps {
    data: unknown[];
    columns: ColumnDef<unknown, any>[];
}

export const BalanceTable: React.FC<BalanceTableProps> = ({
    data,
    columns
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableColumnFilters: true,
        enableFilters: true
    });
    return <DynamicTable table={table} />;
};
