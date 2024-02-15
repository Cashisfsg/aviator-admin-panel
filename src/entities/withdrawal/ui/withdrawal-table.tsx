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
    selectGlobalFilter,
    setSearchQuery
} from "@/app/providers/redux-provider";

import { DynamicTable } from "@/shared/ui";
import { Pagination } from "@/shared/ui/pagination";
import { PageNavigator } from "@/shared/ui/page-navigator";

interface WithdrawalTableProps {
    data: unknown[];
    columns: ColumnDef<unknown, any>[];
}

export const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
    data,
    columns
}) => {
    const dispatch = useAppDispatch();
    const globalFilter = useStateSelector(state => selectGlobalFilter(state));

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

    return (
        <>
            <DynamicTable
                table={table}
                className="w-full"
            />
            <footer className="mt-4 grid grid-cols-3 items-center px-2">
                <div>
                    <span className="text-lg font-medium">
                        Записей на странице:
                    </span>{" "}
                    <select
                        defaultValue="10"
                        onChange={event =>
                            table.setPageSize(Number(event.target.value))
                        }
                        className="rounded border-2 border-neutral-300 px-2 py-1 focus-visible:border-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <Pagination
                    hasPreviousPage={!table.getCanPreviousPage()}
                    hasNextPage={!table.getCanNextPage()}
                    goToTheFirstPage={() => table.setPageIndex(0)}
                    goToThePreviousPage={() => table.previousPage()}
                    goToTheNextPage={() => table.nextPage()}
                    goToTheLastPage={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                    }
                />

                <PageNavigator
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    goToPage={table.setPageIndex}
                />
            </footer>
        </>
    );
};
