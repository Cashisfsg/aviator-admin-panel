import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

import { cn } from "../lib/tailwind-merge";

interface DynamicTableProps extends React.ComponentProps<"table"> {
    table: Table<unknown>;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
    table,
    className,
    ...props
}) => {
    return (
        <table
            className={cn("overflow-hidden rounded-lg text-base", className)}
            {...props}
        >
            <thead className="min-w-full border-b-4 border-double border-b-gray-400 bg-gray-300 text-xl font-medium uppercase text-gray-700">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}
                        // className="min-w-full text-base [&>*:nth-child(1)]:w-[72px] [&>*:nth-child(2)]:w-fit [&>*:nth-child(3)]:w-2/12 [&>*:nth-child(4)]:w-[250px] [&>*:nth-child(5)]:w-[150px] [&>*:nth-child(6)]:w-max [&>*:nth-child(7)]:w-[150px] [&>*:nth-child(8)]:w-max [&>*:nth-child(9)]:w-max"
                        className="text-base"
                    >
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                // onClick={header.column.getToggleSortingHandler()}
                                className="px-3 py-2"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className="border-b border-b-gray-400 leading-none odd:bg-gray-100 even:bg-white [&>:nth-of-type(6)]:whitespace-pre-line [&>:nth-of-type(7)]:whitespace-pre-line"
                    >
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="px-3 py-2 text-center"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
