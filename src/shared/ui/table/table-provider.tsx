import { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { TableContext } from "./use-table-context";

interface TableProviderProps {
    table: Table<unknown>;
    children: React.ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({
    table,
    children
}) => {
    const memoizedTable = useMemo(() => {
        return table;
    }, [table]);

    return (
        <TableContext.Provider value={{ table: memoizedTable }}>
            {children}
        </TableContext.Provider>
    );
};
