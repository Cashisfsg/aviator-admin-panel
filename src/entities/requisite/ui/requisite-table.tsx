import {
    ColumnDef,
    getCoreRowModel,
    // getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { DynamicTable } from "@/shared/ui/dynamic-table";

interface RequisitesTableProps {
    data: unknown[];
    columns: ColumnDef<unknown, any>[];
}

export const RequisitesTable: React.FC<RequisitesTableProps> = ({
    data,
    columns
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
        // getFilteredRowModel: getFilteredRowModel()
        // filterFns: {
        //     customFilter: (rows, columnIds, filterValue) => {
        //         console.log(rows, columnIds, filterValue);
        //         return filterValue.length === 0
        //             ? rows
        //             : rows.filter(row =>
        //                   filterValue.includes(row.original[columnIds])
        //               );
        //     }
        // },
        // state: {
        //     columnFilters
        // },
        // enableColumnFilters: true,
        // enableFilters: true
        // onGlobalFilterChange: searchProps.onChange
    });

    return (
        <DynamicTable
            table={table}
            className="w-full"
        />
    );
};
