import { useEffect } from "react";

import { useTableContext } from "@/shared/ui/table/use-table-context";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    useAppDispatch,
    useStateSelector,
    setSearchQuery,
    selectGlobalFilter
} from "@/app/providers/redux-provider";
import { DynamicTable } from "@/shared/ui/dynamic-table";
import { Replenishment } from "../api";

interface ReplenishmentsTableProps {
    data: Replenishment[];
    columns: ColumnDef<Replenishment>[];
}

export const ReplenishmentsTable: React.FC<ReplenishmentsTableProps> = ({
    data,
    columns
}) => {
    const dispatch = useAppDispatch();
    const globalFilter = useStateSelector(state => selectGlobalFilter(state));

    const { setTable } = useTableContext();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

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
        state: {
            globalFilter
        },
        enableColumnFilters: true,
        enableFilters: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: value => dispatch(setSearchQuery(value))
    });

    useEffect(() => {
        setTable(table);
    }, [table, setTable]);

    return <DynamicTable />;
};
