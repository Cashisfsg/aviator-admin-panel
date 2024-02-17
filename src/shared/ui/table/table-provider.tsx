import { useState, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { TableContext } from "./use-table-context";

interface TableProviderProps {
    children: React.ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
    const [table, setTable] = useState<Table<any> | null>(null);

    const memoizedValue = useMemo(() => {
        return { table, setTable };
    }, [table]);

    return (
        <TableContext.Provider value={memoizedValue}>
            {children}
        </TableContext.Provider>
    );
};
